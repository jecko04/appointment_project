<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AppointmentModel extends Model
{
    use HasFactory;

    protected $table = 'appointments';

    protected $fillable = [
        'selectedBranch',
        'selectServices',
        'appointment_date',  
        'appointment_time',  
        'user_id',        
        'reschedule_date',
        'reschedule_time',
        'status',
        'qr_code',
        'check_in',
    ];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id'); 
    }
    

    // Define the relationship with the Branch model
    public function branch() {
        return $this->belongsTo(BranchModel::class, 'selectedBranch', 'Branch_ID'); 
    }

    // Define the relationship with the Services model
    public function services() {
        return $this->belongsTo(ServicesModel::class, 'selectServices', 'Categories_ID'); 
    }
}
