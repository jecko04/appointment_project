<?php

namespace App\Http\Controllers;

use App\Models\AdminModel;
use App\Models\AppointmentModel;
use App\Models\BranchModel;
use App\Models\OfficeHourModel;
use App\Models\PatientModel;
use App\Models\ServicesModel;
use App\Models\User;
use App\Notifications\AppointmentUpdated;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class UsersAppointmentController extends Controller
{
    public function showUsersAppointment() {
        $branches = BranchModel::all(); 
        $users = User::all();
        $categories = ServicesModel::with('branch')->get();
        $patients = PatientModel::with(['medicalHistory', 'dentalHistory'])->get();
        $office_hours = OfficeHourModel::with('branch')
        ->where('IsClosed', true)
        ->get(); 
        
        $userId = Auth::id(); 
        $appointmentDetails = AppointmentModel::where('user_id', $userId)
        ->whereIn('status', ['pending', 'approved'])
        ->with('users', 'branch', 'services')
        ->get(); 
        
        return Inertia::render('Auth/Appointment', [
            'branches' => $branches, 
            'users' => $users, 
            'categories' => $categories, 
            'patients' => $patients,
            'appointmentDetails' => $appointmentDetails->isNotEmpty() 
            ? $appointmentDetails->map(function ($appointment) {
                return [
                'id' => $appointment->id,
                'selectedBranch' => $appointment->selectedBranch,
                'selectServices' => $appointment->selectServices,
                'status' => $appointment->status,
                'user_id' => $appointment->user_id,
                'appointment_date' => $appointment->appointment_date,
                'appointment_time' => $appointment->appointment_time,
                'reschedule_date' => $appointment->reschedule_date,
                'reschedule_time' => $appointment->reschedule_time,
                'qr_code' => $appointment->qr_code,
                ];
                }) 
                : null,
            'office_hours' => $office_hours,
        ]);
    }

    public function cancelled(Request $request, $id)
    {
        $appointment = AppointmentModel::with(['users', 'branch', 'services'])->findOrFail($id);
    
        if (!$appointment) {
            return redirect()->back()->with('error', 'Appointment not found.');
        }
        
        $user = $appointment->users;

        $request->validate([
            'selectedBranch' => 'required|integer',
            'selectServices' => 'required|integer',
        ]);
        
        $appointment = AppointmentModel::where('id', $id)
        ->where('user_id', Auth::id())
        ->firstOrFail();
        
        $appointment->update([
                'status' => 'cancelled',
        ]);

        Log::info('Selected Branch: ' . $request->selectedBranch);
            $admins = AdminModel::where('Branch_ID', $request->selectedBranch)
            ->pluck('Email');
            
            foreach ($admins as $email) {
                Notification::route('mail', $email)->notify(new AppointmentUpdated($appointment, 'canceled'));
            }
    
        // Use Notification::route to send email notification
        $adminEmail = 'smtc.dentalcare@gmail.com';
        Notification::route('mail', $adminEmail)->notify(new AppointmentUpdated($appointment, 'canceled'));
    
        return response()->json([
            'redirect' => route('appointment'),
            'message' => 'Appointment status updated to canceled successfully!',
        ], 200);
    }
}
