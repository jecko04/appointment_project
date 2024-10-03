<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UpdatePersonalInfomationFormModel extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'date_of_birth',
        'age',
        'gender',
        'phone',
        'address',
        'emergency_contact'
    ];
}
