<?php

namespace App\Models\Mobile;

use App\Models\AdminModel;
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

    public function admin()
    {
        return $this->hasMany(AdminModel::class, 'Role_ID', 'Role_ID');
    }
}
