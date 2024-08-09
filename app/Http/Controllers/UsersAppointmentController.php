<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersAppointmentController extends Controller
{
    public function showUsersAppointment() {
        return Inertia::render('Users/Appointment');
    }
}
