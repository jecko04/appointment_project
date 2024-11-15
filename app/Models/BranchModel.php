<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchModel extends Model
{
    use HasFactory;

    protected $table = 'branch';
    protected $primaryKey = 'Branch_ID';

    protected $fillable = [
        'BranchName',
        'BuildingNumber',
        'Street',
        'Barangay',
        'City',
        'Province',
        'PostalCode',
    ];


    public function services() {
        return $this->hasMany(ServicesModel::class, 'Branch_ID');
    }
    
    public function appointments() {
        return $this->hasMany(AppointmentModel::class, 'Branch_ID'); // One-to-many relationship to AppointmentModel
    }
    
    public function appointmentDetails() {
        return $this->hasMany(AppointmentModel::class, 'Branch_ID'); // Use this for details if needed
    }

    public function emails() {
        return $this->hasMany(AdminModel::class, 'Branch_ID'); // Use this for details if needed
    }

    public function webDentalDoctor() {
        return $this->hasMany(DentalDoctorModel::class, 'Branch_ID');
    }
}
