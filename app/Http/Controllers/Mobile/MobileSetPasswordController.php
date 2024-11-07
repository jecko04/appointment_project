<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Mobile\MobileDentalDoctorModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Termwind\Components\Hr;

class MobileSetPasswordController extends Controller
{

    public function change(Request $request) {
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        $validate = $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($validate['currentPassword'], $user->Password)) {
            return response()->json([
                "success" => false,
                "message" => "The current password is incorrect.",
            ], 200);
        }
       
        $setPassword = MobileDentalDoctorModel::where('Doctors_ID', $user->Doctors_ID)->first();

        $setPassword->update([
            'Password' => Hash::make($request->newPassword),
        ]);


        return response()->json([
            "success" => true,
            "message" => "Password changed successfully.",
            // "data" => [
            //     'setPassword' => $setPassword,
            // ],
        ], 200);
    }
}
