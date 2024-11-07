<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MobileLogoutController extends Controller
{
    public function logout(Request $request) {
        $user = Auth::guard('api_dentaldoctor')->user(); 

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information.",
            ], 403);
        }

        if ($user) {
            $user->tokens->each(function ($token) {
                $token->delete();
            });
    
            return response()->json([
                "success" => true,
                "message" => "User logged out and token revoked.",
            ]);
        }
    
        return response()->json([
            "success" => false,
            "message" => "No authenticated user found.",
        ], 401);


    }
}
