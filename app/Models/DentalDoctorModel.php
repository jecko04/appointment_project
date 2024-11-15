<?php

namespace App\Models;

use App\Models\Mobile\RoleModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class DentalDoctorModel extends Model
{
    use Notifiable;

    protected $table = 'dentaldoctor';
    protected $primaryKey = 'Doctors_ID';

    protected $fillable = [
        'Name',
        'Email',
        'Birth_Date',
        'Password',
        'Profession',
        'License_Number',
        'Specialization',
        'License_Expiry_Date',
        'Branch_ID',
        'Role_ID',
    ];

    public function branch()
    {
        return $this->belongsTo(BranchModel::class, 'Branch_ID');
    }

    public function role()
    {
        return $this->belongsTo(RoleModel::class, 'Role_ID');
    }
}
