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
        return $this->hasMany(ServicesModel::class, 'Branch_ID'); // Establish a one-to-many relationship to ServicesModel
    }

    public function appointments() {
        return $this->belongsToMany(AppointmentModel::class, 'guest.appointment'); // Ensure this is correct
    }
}
