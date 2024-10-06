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
        'user_id',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the MedicalHistory model
    public function medicalHistory()
    {
        return $this->hasOne(MedicalHistoryModel::class, 'patient_id');
    }

    // Define the relationship with the DentalHistory model
    public function dentalHistory()
    {
        return $this->hasOne(DentalHistoryModel::class, 'patient_id');
    }
}