<?php

namespace App\Models;

use App\Models\Mobile\RoleModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminModel extends Model
{
    use HasFactory;

    protected $table = "admin";
    protected $primaryKey = 'Admin_ID';

    protected $fillable = [
        'Name',
        'Email',
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
