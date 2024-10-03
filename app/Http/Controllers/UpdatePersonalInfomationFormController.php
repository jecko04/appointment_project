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

    public function updateinfo(Request $request)
    {
        $validated = $request->validate([
            'date_of_birth' => 'required|date',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'emergency_contact' => 'required|string',
        ]);

        $user = $request->user();

        $user -> update([
            'date_of_birth' => $validated['date_of_birth'],
            'age' => $validated['age'],
            'gender' => $validated['gender'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'emergency_contact' => $validated['emergency_contact'],
        ]);

        return redirect()->route('profile.update.personalinfo')->with('success', 'Profile updated successfully!');
    }


}
