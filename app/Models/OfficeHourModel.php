<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficeHourModel extends Model
{
    use HasFactory;

    protected $table = "office_hours";

    protected $fillable = [
        'DayOfWeek',  // the value of this is 'Monday', 'Tuesday' up to 'Sunday'
        'StartTime',
        'EndTime',
        'IsClosed', // the value of this is '0' and '1'
        'Branch_ID',
    ];

    public function branch() {
        return $this->belongsTo(BranchModel::class, 'Branch_ID', 'Branch_ID');
    }
}
