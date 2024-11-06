<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Mobile\MobileAppointmentModel;
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
}
