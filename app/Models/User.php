<?php

namespace App\Models;

use App\Http\Controllers\DentalNotesController;
use App\Models\Mobile\MobileDentalDoctorModel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'date_of_birth',
        'age',
        'gender',
        'phone',
        'address',
        'emergency_contact'

    ];

    public function appointments() {
        return $this->hasMany(AppointmentModel::class, 'user_id');
    }

    public function notes() {
        return $this->hasMany(NotesModel::class, 'user_id');
    }

    public function reschedule_reasons() {
        return $this->hasMany(RescheduleReasonsModel::class, 'user_id');
    }

    

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
