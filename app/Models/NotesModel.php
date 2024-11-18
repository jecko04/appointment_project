<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotesModel extends Model
{
    use HasFactory;

    protected $table = 'notes';

    protected $fillable = [
        'user_id',
        'email',
        'notes',
        'created_at',
        'updated_at',
    ];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id'); 
    }
    
}
