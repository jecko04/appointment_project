<?php

namespace App\Http\Controllers;

use App\Models\AppointmentModel;
use App\Models\User;
use App\Models\BranchModel;
use App\Models\OfficeHourModel;
use App\Models\PatientModel;
use App\Models\ServicesModel;
use App\Notifications\AppointmentUpdated;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function appointment() {
        $branches = BranchModel::all(); 
        $categories = ServicesModel::with('branch')->get();
        $office_hours = OfficeHourModel::with('branch')
        ->where('IsClosed', true)
        ->get(); 

        $userId = Auth::id(); 
        $appointmentDetails = AppointmentModel::where('user_id', $userId)
        ->whereIn('status', ['pending', 'approved'])
        ->with('users', 'branch', 'services')
        ->get();

        $allAppointmentDate = AppointmentModel::whereIn('status', ['pending', 'approved'])
        ->with('users', 'branch', 'services')
        ->get();
        

        $patients = PatientModel::with(['medicalHistory', 'dentalHistory'])->get();

        return Inertia::render('Guest/GuestAppointment', [
            'branches' => $branches, 
            'categories' => $categories, 
            'patients' => $patients, 
            'office_hours' => $office_hours,

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
                ];
                }) 
                : null,
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
        ]);
    }

    public function storeAppointment(Request $request)
    {
        $validate = $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'date_of_birth' => 'required|date', 
            'age' => 'required|integer|min:1|max:120',
            'gender' => 'required|in:male,female,other', 
            'phone' => 'required|string|regex:/^(\+?\d{1,4}[\s-]?)?\d{10}$/', 
            'address' => 'nullable|string|max:255', 

            'selectedBranch' => 'required|integer',
            'selectServices' => 'required|integer',
            'appointment_date' => 'required|date', 
            'appointment_time' => 'required|string|date_format:H:i',
            'qr_code' => 'required|string',

        ]);

        $dobformatted = Carbon::createFromFormat('Y-m-d', $validate['date_of_birth'])->format('Y-m-d');
        $dateformatted = Carbon::createFromFormat('Y-m-d', $validate['appointment_date'])->format('Y-m-d');
        $timeformatted = Carbon::createFromFormat('H:i', $validate['appointment_time'])->format('H:i:s');

        $request->merge(['email' => strtolower($request->email)]);

        $patient = PatientModel::firstOrCreate(
            [
                'email' => $request->email, 
                'Branch_ID' => $request->selectedBranch
            ], 
            [
                // Only populate these fields if a new record is being created
                'user_id' => $request->userId,
                'fullname' => $request->fullname,
                'date_of_birth' => $dobformatted,
                'age' => $request->age,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'address' => $request->address,
                'emergency_contact' => $request->emergency_contact,
                'Branch_ID' => $request->selectedBranch,
            ]
        );
        
        // If patient already exists, update fields except for Branch_ID
        if (!$patient->wasRecentlyCreated) {
            $patient->update([
                'user_id' => $request->userId,
                'fullname' => $request->fullname,
                'date_of_birth' => $dobformatted,
                'age' => $request->age,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'emergency_contact' => $request->emergency_contact,
            ]);
        }

        $medicalHistoryData = [
            'patient_id' => $patient->id,
            'medical_conditions' => $request->medical_condition,
            'current_medications' => $request->current_medication,
            'allergies' => $request->allergies,
            'past_surgeries' => $request->past_surgeries,
            'family_medical_history' => $request->family_medical_history,
            'blood_pressure' => $request->blood_pressure,
            'heart_disease' => $request->heart_disease,
            'diabetes' => $request->diabetes,
            'smoker' => $request->smoker,

        ];

        $patient->medicalHistory()->updateOrCreate(
            ['patient_id' => $patient->id], // Ensure we link to the correct patient
            $medicalHistoryData
        );

        $dentalHistoryData = [
            'patient_id' => $patient->id, 
            //'last_dental_visit' => $request->last_dental_visit,
            'past_dental_treatments' => $request->past_dental_treatments,
            'tooth_sensitivity' => $request->tooth_sensitivity,
            'frequent_tooth_pain' => $request->frequent_tooth_pain,
            'gum_disease_history' => $request->gum_disease_history,
            'teeth_grinding' => $request->teeth_grinding,
            'orthodontic_treatment' => $request->orthodontic_treatment,
            'dental_implants' => $request->dental_implants,
            'bleeding_gums' => $request->bleeding_gums,
        ];

        $patient->dentalHistory()->updateOrCreate(
            ['patient_id' => $patient->id], // Ensure we link to the correct patient
            $dentalHistoryData
        );

        $qrCodeData = json_decode($request->qr_code, true);

        $appointment = AppointmentModel::create([
            'selectedBranch' => $request->selectedBranch,
            'selectServices' => $request->selectServices,
            'appointment_date' => $dateformatted,
            'appointment_time' => $timeformatted,
            'user_id' => Auth::id(), 
            'qr_code' => json_encode($qrCodeData),
        ]);

        $appointment = AppointmentModel::with(['users', 'branch', 'services'])->find($appointment->id);

        $user = $appointment->users;

        $adminEmail = 'smtc.dentalcare@gmail.com';
        Notification::route('mail', $adminEmail)->notify(new AppointmentUpdated($appointment, 'created'));

        $appointment->save();

        return response()->json([
            'redirect' => route('dashboard'), 
            'message' => 'Appointment created successfully!',
        ], 201);
    }
}
