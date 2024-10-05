<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicesModel extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'Categories_ID';

    protected $fillable = [
        'Title',
        'Description',
        'Duration',
        'Frequency',
        'Price',
        'Branch_ID'
    ];


    public function branch() {
        return $this->belongsTo(BranchModel::class, 'Branch_ID', 'Branch_ID'); // This establishes the relationship to the BranchModel
    }

    public function appointments() {
        return $this->belongsToMany(AppointmentModel::class, 'guest.appointment'); // Make sure 'guest.appointment' is the correct pivot table name
    }
}
