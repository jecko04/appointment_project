<?php

namespace App\Models\Mobile;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MobileRescheduleReasons extends Model
{
    use HasFactory;

    protected $table = 'reschedule_reasons';

    protected $fillable = [
        'appointment_id',
        'user_id',
        'reason',
        'created_at',
    ];

}
