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
        Schema::create('employees', function (Blueprint $table) {
            $table->id('Employee_ID');
            $table->string('Fullname');
            $table->string('Email')->unique();
            $table->string('Phone')->nullable();
            $table->date('DateOfBirth');
            $table->string('Address')->nullable();
            $table->string('Position');
            $table->date('HireDate');
            $table->string('Specialization')->nullable();
            $table->string('LicenseNumber')->nullable();
            $table->string('Status')->default('active');
            $table->unsignedBigInteger('Branch_ID');
            $table->timestamps();

            $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
