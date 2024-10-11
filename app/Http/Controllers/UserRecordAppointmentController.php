<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRecordAppointmentController extends Controller
{
    public function showRecordAppointment() {
        return Inertia::render('Auth/Record');
    }
}
