<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalHistoryModel extends Model
{
    use HasFactory;

    protected $table = 'medical_history';

    protected $fillable = [
        'patient_id',
        'medical_condition',
        'current_medication',
        'allergies',
        'past_surgeries',
        'family_medical_history',
        'blood_pressure',
        'heart_disease',
        'diabetes',
        'smoker',
    ];

    public function patient()
    {
        return $this->belongsTo(PatientModel::class, 'patient_id');
    }
}
