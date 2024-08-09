<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
        
    }

    public function showAdminLogin() {
        return Inertia::render('Auth/AdminLogin');
    }

    public function logout(Request $request) {
        Auth::guard('admin')->logout(); // Log out the admin
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login'); // Redirect to the login page
    }
}
