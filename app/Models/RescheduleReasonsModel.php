<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RescheduleReasonsModel extends Model
{
    use HasFactory;

    protected $table = 'reschedule_reasons';

    protected $fillable = [
        'appointment_id',
        'user_id',
        'reason',
        'created_at',
    ];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id'); 
    }

    public function appointment() {
        return $this->belongsTo(AppointmentModel::class, 'appointment_id', 'id'); 
    }
}
