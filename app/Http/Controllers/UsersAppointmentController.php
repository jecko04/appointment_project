<?php

namespace App\Http\Controllers;

use App\Models\AppointmentModel;
use App\Models\BranchModel;
use App\Models\PatientModel;
use App\Models\ServicesModel;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UsersAppointmentController extends Controller
{
    public function showUsersAppointment() {
        $branches = BranchModel::all(); 
        $users = User::all();
        $categories = ServicesModel::with('branch')->get();
        $patients = PatientModel::with(['medicalHistory', 'dentalHistory'])->get();
    
        $userId = Auth::id(); 
        $appointmentDetails = AppointmentModel::where('user_id', $userId)->with('users', 'branch', 'services')->get(); 

        
        return Inertia::render('Auth/Appointment', [
            'branches' => $branches, 
            'users' => $users, 
            'categories' => $categories, 
            'patients' => $patients,
            'appointmentDetails' => $appointmentDetails,
        ]);
    }
}
