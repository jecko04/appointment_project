<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Mobile\MobileAppointmentModel;
use App\Models\Mobile\MobileDentalDoctorModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MobileDashboardController extends Controller
{
    public function name() {
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        $doctorName = strtoupper($user->Name);
        

        return response()->json([
            "success" => true,
            "data" => [
                'name' => $doctorName],
        ]);
    }
    
    public function dashboard() {
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        

        $appointments = MobileAppointmentModel::with(['user', 'branch', 'service'])
            ->where('status', 'approved')
            ->where(function($query) {
                $query->whereDate('appointment_date', Carbon::today())
                      ->orWhereDate('reschedule_date', Carbon::today());
            })
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
            "data" => [
                'appointment' => $formattedAppointments],
        ]);
    }
}
