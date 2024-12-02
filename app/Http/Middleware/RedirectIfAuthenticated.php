<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard()->check() && Auth::user()->email_verified_at === null) {
            // Log out the user if email is not verified
            //Auth::logout();
            
            return redirect()->route('verification.notice')->with('message', 'Please verify your email before accessing the application.');
        }

        return $next($request);
    }
}
