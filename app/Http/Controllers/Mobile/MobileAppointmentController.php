<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Mobile\MobileAppointmentModel;
use App\Models\Mobile\MobileDentalNotes;
use App\Models\Mobile\MobileRescheduleReasons;
use App\Models\PatientModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MobileAppointmentController extends Controller
{
    //
    public function appointment()
    {

        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }
       
        $appointments = MobileAppointmentModel::with(['user', 'branch', 'service'])
            ->where('status', 'approved')
            ->where('selectedBranch', 1)
            ->get();

        if ($appointments->isEmpty()) {
            return response()->json([
                "success" => false,
                "data" => null,
            ]);
        }

        // Format the appointments
        $formattedAppointments = $appointments->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'user_id' => $appointment->user_id,
                'status' => $appointment->status,
                'name' => $appointment->user->name ?? 'N/A',
                'branch' => $appointment->branch->BranchName ?? 'N/A',
                'services' => $appointment->service->Title ?? 'N/A',
                'appointment_date' => $appointment->appointment_date,
                'appointment_time' => $appointment->appointment_time,
                'reschedule_date' => $appointment->reschedule_date,
                'reschedule_time' => $appointment->reschedule_time,
            ];
        });

        return response()->json([
            "success" => true,
            "data" => ['appointment' => $formattedAppointments],
        ]);
    }

    public function notes() {

        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        $notes = MobileDentalNotes::all();
        $reschedule_reasons = MobileRescheduleReasons::all();

        return response()->json([
            "success" => true,
            "data" => [
                'notes' => $notes,
                'reschedule_reasons' => $reschedule_reasons,
            ],
        ]);
    }

    public function dentaldetails() {
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        $patients = PatientModel::with(['medicalHistory', 'dentalHistory'])->get();

        return response()->json([
            "success" => true,
            "data" => [
                'patients' => $patients,
                'medical_history' => $patients->pluck('medicalHistory'),
                'dental_history' => $patients->pluck('dentalHistory')
            ],
        ]);
    }
}
