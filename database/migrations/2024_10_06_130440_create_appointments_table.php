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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Foreign key to 'users' table
            $table->string('fullname');
            $table->date('date_of_birth');
            $table->integer('age');
            $table->enum('gender', ['male', 'female']);
            $table->string('phone');
            $table->string('email');
            $table->string('address');
            $table->string('emergency_contact');
            $table->string('dental_services'); // Or use foreign key to services table if necessary
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->date('reschedule_date')->nullable();
            $table->time('reschedule_time')->nullable();
            $table->string('qr_code')->nullable();
            $table->boolean('check_in')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
