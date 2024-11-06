<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Mobile\MobileDentalDoctorModel;
use App\Models\Mobile\MobileLoginModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class MobileLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $doctor = MobileDentalDoctorModel::where('Email', $request->email)->first();

        if (!$doctor) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (Auth::guard('api_dentaldoctor')->attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            return response()->json([
                'success' => true,
                'message' => 'Login successful'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }
}
