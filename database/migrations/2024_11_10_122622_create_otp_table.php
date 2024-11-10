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
        Schema::create('otp', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('Admin_ID')->nullable();
            $table->unsignedBigInteger('SuperAdmin_ID')->nullable();
            $table->string('email');
            $table->string('otp');
            $table->dateTime('otpExpirationDate');
            $table->boolean('isUsed')->default(false);
            $table->timestamps();

            $table->foreign('Admin_ID')->references('Admin_ID')->on('admin')->onDelete('cascade');
            $table->foreign('SuperAdmin_ID')->references('SuperAdmin_ID')->on('superadmin')->onDelete('cascade');

            $table->unique(['email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otp');
    }
};
