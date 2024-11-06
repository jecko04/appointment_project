<?php

namespace App\Models\Mobile;

use App\Models\BranchModel;
use App\Models\ServicesModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MobileAppointmentModel extends Model
{
    use HasFactory;

    protected $table = 'appointments';

    public function branch()
    {
        return $this->belongsTo(BranchModel::class, 'selectedBranch', 'Branch_ID');
    }

    public function service()
    {
        return $this->belongsTo(ServicesModel::class, 'selectServices', 'Categories_ID');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
