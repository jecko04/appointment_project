<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => [
            'required',
            'string',
            'min:8', 
            'regex:/[A-Z]/', 
            'regex:/[0-9]/', 
            'confirmed',
        ],
            'dob' => 'required|date', 
            'age' => 'required|integer|min:1|max:120',
            'gender' => 'required|in:male,female,other', 
            'phone' => 'required|string|regex:/^(\+?\d{1,4}[\s-]?)?\d{10}$/', 
            'address' => 'nullable|string|max:255', 
  
        ]);

        $dobformatted = Carbon::createFromFormat('Y-m-d', $validate['dob'])->format('Y-m-d');
        $request->merge(['email' => strtolower($request->email)]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'date_of_birth' => $dobformatted,
            'age' => $request->age,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
            'emergency_contact' => $request->emergency_contact,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('appointment', absolute: false));
    }
}
