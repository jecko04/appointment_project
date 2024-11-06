<?php

namespace App\Models\Mobile;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleModel extends Model
{
    use HasFactory;

    protected $table = "role";

    public function dentalDoctors()
    {
        return $this->hasMany(MobileDentalDoctorModel::class, 'Role_ID', 'Role_ID');
    }
}
