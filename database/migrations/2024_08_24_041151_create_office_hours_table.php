<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('office_hours', function (Blueprint $table) {
                $table->id('OfficeHour_ID');
                $table->string('DayOfWeek');  // Store the day of the week (e.g., Monday)
                $table->time('StartTime');     // Start time for the day
                $table->time('EndTime');       // End time for the day
                $table->boolean('IsClosed');   // Boolean to indicate if the office is closed
                $table->unsignedBigInteger('Branch_ID');
    
                $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade');
    
                $table->unique(['DayOfWeek', 'Branch_ID']);
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_hours');
    }
};
