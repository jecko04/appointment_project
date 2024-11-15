<?php

namespace App\Http\Middleware;

use App\Models\AppointmentModel;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAppointment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {

            $id = Auth::id();

            $hasAppointment = AppointmentModel::where('user_id', $id)
            ->whereIn('status', ['pending', 'approved'])
            ->exists();


            if($hasAppointment) {
                return redirect()->route('appointment');
            }
        }
        return $next($request);
    }
}
