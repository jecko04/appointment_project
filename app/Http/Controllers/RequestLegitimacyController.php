<?php

namespace App\Http\Controllers;

use App\Models\DentalDoctorModel;
use App\Notifications\NotifyDentalDoctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class RequestLegitimacyController extends Controller
{
    public function request() {

        return Inertia::render('Users/DentalLegitimacyRequest', [

        ]);
    }

    public function sendRequestNotification(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'email' => 'required|email|in:' . Auth::user()->email,
        ]);

        $doctors = DentalDoctorModel::where('Role_ID', 3)->get();

        if ($doctors->isEmpty()) {
            return response()->json(['error' => 'Dental doctor not found.'], 404);
        }
    
        foreach ($doctors as $doctor) {
            Notification::route('mail', $validated['email'])->notify(new NotifyDentalDoctor($doctor));
        }


        return response()->json([
            'redirect' => route('appointment'),
            'message' => 'Request sent successfully!'
        ]);
    }
}
