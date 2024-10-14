<?php

namespace App\Http\Controllers;

use App\Models\AppointmentModel;
use App\Models\BranchModel;
use App\Models\ServicesModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(Request $request) 
    {

        $branches = BranchModel::all(); 
        $categories = ServicesModel::with('branch')->get();

        $userId = Auth::id(); 
        $appointmentDetails = AppointmentModel::where('user_id', $userId)->with('users', 'branch', 'services')->get();
        $user = User::where('id', $userId)->get();
        
        return Inertia::render('Dashboard', [
           'appointmentDetails' => $appointmentDetails->isNotEmpty() 
            ? $appointmentDetails->map(function ($appointment) {
                return [
                'id' => $appointment->id,
                'selectedBranch' => $appointment->selectedBranch,
                'selectServices' => $appointment->selectServices,
                'status' => $appointment->status,
                'user_id' => $appointment->user_id,
                ];
                }) 
                : null,
            'branches' => $branches,
            'categories' => $categories,
            'user' => $user->isNotEmpty() 
            ? $user->map(function ($users) {
                return [
                'id' => $users->id,
                'name' => $users->name,
                ];
                }) 
                : null,
        ]);
    }
}
