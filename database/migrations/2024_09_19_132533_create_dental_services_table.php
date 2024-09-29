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
        Schema::create('dental_services', function (Blueprint $table) {
            $table->id('dentalservices_id'); // Primary key
            $table->string('dentalservices'); // Service name
            $table->text('description')->nullable(); // Optional description
            $table->integer('duration'); // Duration in minutes
            $table->string('frequency'); // Frequency of the service
            $table->decimal('price', 10, 2); // Price of the service
            $table->string('dayofweek'); // Day of the week
            $table->time('starttime'); // Start time
            $table->time('endtime'); // End time
            $table->unsignedBigInteger('Branch_ID'); // Foreign key to branches table
            $table->string('address'); // Address
            $table->boolean('isavailable'); // Availability
            $table->integer('max_appointment');

            // Foreign key constraint
            $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade');

            $table->unique(['dentalservices', 'Branch_ID', 'dayofweek']); 

            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dental_services');
    }
};
