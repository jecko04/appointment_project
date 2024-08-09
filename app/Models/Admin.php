<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;

    // Define the table name
    protected $table = 'superadmin'; // Ensure this matches your actual table name

    protected $primaryKey = 'SuperAdmin_ID'; // Replace with your primary key column

    // Set the primary key type
    protected $keyType = 'int'; // or 'string' if your key is a string
    
    // Define fillable fields for mass assignment
    protected $fillable = [
        'name', 'email', 'password',
    ];

    // Define hidden fields (fields that should be hidden in arrays)
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getAuthPassword()
    {
        return $this->Password;
    }
}
