<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AppointmentModel extends Authenticatable
{
    use HasFactory;

    //this is where the appointment inputed
    protected $fillable = [
        'fullname',
        'date_of_birth',
        'age',
        'gender',
        'phone',
        'email',
        'address',
        'emergency_contact',
        'dental_services',
        'appointment_date',
        'appointment_time',
        'reschedule_date',
        'reschedule_time',
        'reschedule_date',
        'qr_code',
        'check_in',
    ];
}
