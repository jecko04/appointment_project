<?php

namespace App\Http\Controllers;

use App\Models\AppointmentModel;
use App\Models\BranchModel;
use App\Models\OfficeHourModel;
use App\Models\ServicesModel;
use App\Models\User;
use App\Notifications\AppointmentUpdated;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class RescheduleController extends Controller
{
    public function reschedule()
    {
        $branches = BranchModel::all(); 
        $categories = ServicesModel::with('branch')->get();

        $userId = Auth::id(); 
        $appointmentDetails = AppointmentModel::where('user_id', $userId)
        ->whereIn('status', ['pending', 'approved'])
        ->with('users', 'branch', 'services')
        ->get();
        
        $allAppointmentDate = AppointmentModel::whereIn('status', ['pending', 'approved'])
        ->with('users', 'branch', 'services')
        ->get();

        $office_hours = OfficeHourModel::with('branch')
        ->where('IsClosed', true)
        ->get(); 

        $user = User::where('id', $userId)->get();
        $users = User::all();

        return Inertia::render('Auth/Reschedule', [
            'appointmentDetails' => $appointmentDetails->isNotEmpty() 
            ? $appointmentDetails->map(function ($appointment) {
                return [
                'id' => $appointment->id,
                'selectedBranch' => $appointment->selectedBranch,
                'selectServices' => $appointment->selectServices,
                'status' => $appointment->status,
                'user_id' => $appointment->user_id,
                'appointment_date' => $appointment->appointment_date,
                'reschedule_date' => $appointment->reschedule_date,
                ];
                }) 
                : [],
            'allAppointmentDate' => $allAppointmentDate->isNotEmpty() 
            ? $allAppointmentDate->map(function ($appointment) {
                return [
                'id' => $appointment->id,
                'user_id' => $appointment->user_id,
                'appointment_date' => $appointment->appointment_date,
                'reschedule_date' => $appointment->reschedule_date,
                ];
                }) 
                : [],
            'branches' => $branches,
            'categories' => $categories,
            'office_hours' => $office_hours,
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

    public function storeReschedule(Request $request)
    {
        $validate = $request->validate([
            'selectedBranch' => 'required|integer',
            'selectServices' => 'required|integer',
            'reschedule_date' => 'required|date', 
            'reschedule_time' => 'required|string|date_format:H:i',
        ]);

        $dateformatted = Carbon::createFromFormat('Y-m-d', $validate['reschedule_date'])->format('Y-m-d');
        $timeformatted = Carbon::createFromFormat('H:i', $validate['reschedule_time'])->format('H:i:s');

        $appointment = AppointmentModel::updateOrCreate(
        [
            'user_id' => Auth::id(),
            'selectedBranch' => $validate['selectedBranch'],  
            'selectServices' => $validate['selectServices'], 
        ],     
        [
            'reschedule_date' => $dateformatted,
            'reschedule_time' => $timeformatted,
            'status' => 'pending',
        ]);

        $appointment = AppointmentModel::with(['users', 'branch', 'services'])->find($appointment->id);

        $user = $appointment->users;


        $adminEmail = 'smtc.dentalcare@gmail.com';
        Notification::route('mail', $adminEmail)->notify(new AppointmentUpdated($appointment, 'rescheduled'));

        return response()->json([
            'redirect' => route('appointment'), 
            'message' => 'Appointment rescheduled successfully!',
        ], 201);
    }
}
