<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AppointmentModel extends Model
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
        'qr_code',
        'check_in',
    ];

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
