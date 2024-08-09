<?php

namespace App\Http\Middleware;

use App\Http\Requests\Auth\LoginRequest;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Check if the user is authenticated and is an admin
        if (!Auth::guard('admin')->check()) {
            // Redirect to the login page if not authenticated as admin
            return redirect()->route('admin.login');
        }

        // Proceed with the request if authenticated as admin
        return $next($request);
    }
    
}
