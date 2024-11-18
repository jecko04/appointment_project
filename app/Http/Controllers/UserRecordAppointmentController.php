<?php

namespace App\Http\Controllers;

use App\Models\AppointmentModel;
use App\Models\BranchModel;
use App\Models\ServicesModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserRecordAppointmentController extends Controller
{
    public function showRecordAppointment() {

        $branches = BranchModel::all(); 
        $categories = ServicesModel::with('branch')->get();
        $users = User::all();

        $userId = Auth::id(); 

        $cancelled = AppointmentModel::where('user_id', $userId)
        ->whereIn('status', ['cancelled'])
        ->with('users', 'branch', 'services')
        ->orderBy('created_at', 'desc')
        ->get();

        $completed = AppointmentModel::where('user_id', $userId)
        ->whereIn('status', ['completed'])
        ->with('users', 'branch', 'services')
        ->orderBy('created_at', 'desc')
        ->get();

        $missed = AppointmentModel::where('user_id', $userId)
        ->whereIn('status', ['missed'])
        ->with('users', 'branch', 'services')
        ->orderBy('created_at', 'desc')
        ->get();
        
        $user = User::where('id', $userId)->get();

        return Inertia::render('Auth/Record', [
            'branches' => $branches, 
            'users' => $users, 
            'categories' => $categories, 
            'cancelled' => $cancelled,
            'completed' => $completed,
            'missed' => $missed,
        ]);
    }
}
