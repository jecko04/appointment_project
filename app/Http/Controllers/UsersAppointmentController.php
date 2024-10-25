<?php

namespace App\Http\Controllers;

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
            'appointmentDetails' => $appointmentDetails,
            'office_hours' => $office_hours,
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
        ]);

        $appointment = AppointmentModel::with(['users', 'branch', 'services'])->find($appointment->id);

        $user = $appointment->users;


        $adminEmail = 'smtc.dentalcare@gmail.com';
        Notification::route('mail', $adminEmail)->notify(new AppointmentUpdated($appointment, 'rescheduled'));

        return redirect()->back()->with('success', 'Appointment saved successfully!');
    }

    public function destroy($id)
    {
        $appointment = AppointmentModel::with(['users', 'branch', 'services'])->findOrFail($id);
    
        if (!$appointment) {
            return redirect()->back()->with('error', 'Appointment not found.');
        }
        
        $user = $appointment->users;
        
        $appointment->delete();
    
        // Use Notification::route to send email notification
        $adminEmail = 'smtc.dentalcare@gmail.com';
        Notification::route('mail', $adminEmail)->notify(new AppointmentUpdated($appointment, 'canceled'));
    
        return redirect()->back()->with('success', 'Appointment deleted successfully.');
    }
}
