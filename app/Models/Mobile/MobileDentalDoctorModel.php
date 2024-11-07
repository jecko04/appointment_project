<?php

namespace App\Models\Mobile;

use App\Models\BranchModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class MobileDentalDoctorModel extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'dentaldoctor';
    protected $primaryKey = 'Doctors_ID';

    protected $fillable = [
        'Name',
        'Email',
        'Password',
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

    protected $hidden = [
        'Password',
    ];

    // public function setPasswordAttribute($value)
    // {
    //     $this->attributes['Password'] = bcrypt($value);
    // }
}
