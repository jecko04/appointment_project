<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UpdatePersonalInfomationFormModel;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UpdatePersonalInfomationFormController extends Controller
{

    // public function updateinfo(Request $request): RedirectResponse
    // {

    //     $validated = $request->validate([
    //         'date_of_birth' => 'required|date',
    //         'age' => 'required|integer',
    //         'gender' => 'required|string',
    //         'phone' => 'required|string',
    //         'address' => 'required|string',
    //         'emergency_contact' => 'required|string',
    //     ]);

    //     $dateOfBirth = Carbon::parse($validated['date_of_birth'])->format('Y-m-d');

    //     $user = $request->user();

    //         $user -> update([
    //             'date_of_birth' => $dateOfBirth,
    //             'age' => $validated['age'],
    //             'gender' => $validated['gender'],
    //             'phone' => $validated['phone'],
    //             'address' => $validated['address'],
    //             'emergency_contact' => $validated['emergency_contact'],
    //         ]);

    //         $user->updated_at = now();
    
    //         return redirect()->route('profile.update.info')->with('success', 'Profile updated successfully!');
    //     }
}
