<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /*
    update personal info
    */
    public function updateinfo(Request $request): RedirectResponse
    {

        $validated = $request->validate([
            'date_of_birth' => 'required|date',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'emergency_contact' => 'required|string',
        ]);

        $dateOfBirth = Carbon::parse($validated['date_of_birth'])->format('Y-m-d');

        $user = $request->user();

            $user -> update([
                'date_of_birth' => $dateOfBirth,
                'age' => $validated['age'],
                'gender' => $validated['gender'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'emergency_contact' => $validated['emergency_contact'],
            ]);

            $user->updated_at = now();
    
            return redirect()->route('profile.edit')->with('success', 'Profile updated successfully!');
        }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

}
