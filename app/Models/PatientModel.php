<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientModel extends Model
{
    use HasFactory;

    protected $table = 'patients';

    protected $fillable = [
        'user_id',
        'fullname',
        'date_of_birth',
        'age',
        'gender',
        'phone',
        'address',
        'emergency_contact',
        'Branch_ID',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    // Relationship with MedicalHistory model
    public function medicalHistory()
    {
        return $this->hasOne(MedicalHistoryModel::class, 'patient_id');
    }

    // Relationship with DentalHistory model
    public function dentalHistory()
    {
        return $this->hasOne(DentalHistoryModel::class, 'patient_id');
    }

    public function branch() {
        return $this->belongsTo(BranchModel::class, 'Branch_ID', 'Branch_ID'); // This establishes the relationship to the BranchModel
    }
}
