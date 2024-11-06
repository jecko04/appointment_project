<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isDentalDoctor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (!Auth::guard('api_dentaldoctor')->check()) {
            return response()->json([
                "success" => false,
                "message" => "Access denied. Only dental doctors can access this information."
            ], 403);
        }
        
        return $next($request);
    }
}
