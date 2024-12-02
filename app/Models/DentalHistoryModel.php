<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DentalHistoryModel extends Model
{
    use HasFactory;

    protected $table = 'dental_history';

    protected $fillable = [
        'patient_id',
        'past_dental_treatments',
        'frequent_tooth_pain',
        'gum_disease_history',
        'teeth_grinding',
        'tooth_sensitivity',
        'tooth_sensitive',
        'orthodontic_treatment',
        'dental_implants',
        'bleeding_gums',
    ];

    public function patient()
    {
        return $this->belongsTo(PatientModel::class, 'patient_id');
    }
}
