<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Mobile\MobileDentalDoctorModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MobileSetProfileController extends Controller
{
    public function getProfile() {
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        $doctorName = strtoupper($user->Name);

        $setProfile = MobileDentalDoctorModel::where('Name', $user->Name)
        ->where('Email', $user->Email)
        ->get();

        return response()->json([
            "success" => true,
            "data" => [
                'name' => $doctorName,
                'setProfile' => $setProfile,
            ],
        ]);
    }

    public function setProfile(Request $request) {
         
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'birth_date' => 'nullable|date', // Allow null values for birth_date
            'profession' => 'nullable|string|max:255', // Allow null values for profession
            'license_number' => 'nullable|string|max:255', // Allow null values for license_number
            'specialization' => 'nullable|string|max:255', // Allow null values for specialization
            'license_expiry_date' => 'nullable|date', // Allow null values for license_expiry_date
        ]);

        $setProfile = MobileDentalDoctorModel::where('Name', $user->Name)
        ->where('Email', $user->Email)
        ->first();

        $setProfile->update([
            'Name' => $validate['name'],
            'Email' => $validate['email'],
            'Birth_Date' => $validate['birth_date'] ?? null,
            'Profession' => $validate['profession'] ?? null,
            'License_Number' => $validate['license_number'] ?? null,
            'Specialization' => $validate['specialization'] ?? null,
            'License_Expiry_Date' => $validate['license_expiry_date'] ?? null,
        ]);

        return response()->json([
            "success" => true,
            "data" => [
                'name' => $setProfile->Name,
                'setProfile' => $setProfile,
            ],
        ]);

    } 
}
