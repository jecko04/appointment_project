<?php

namespace App\Http\Controllers;

use App\Models\BranchModel;
use App\Models\PatientModel;
use App\Models\ServicesModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function appointment() {
        $branches = BranchModel::all(); 
        $categories = ServicesModel::with('branch')->get();
        
        $patients = PatientModel::with(['medicalHistory', 'dentalHistory'])->get();

        return Inertia::render('Guest/GuestAppointment', [
            'branches' => $branches, 
            'categories' => $categories, 
            'patients' => $patients, 
        ]);
    }


}
