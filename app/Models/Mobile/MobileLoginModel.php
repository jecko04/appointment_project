<?php

namespace App\Models\Mobile;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MobileLoginModel extends Model
{
    use HasFactory;

    protected $table = "dentaldoctor";

    protected $fillable = [
        'Doctors_ID',
        'Email',
        'Password',
    ];
}
