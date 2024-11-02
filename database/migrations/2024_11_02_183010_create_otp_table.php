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
            $table->integer('Admin_ID')->default(0);
            $table->integer('SuperAdmin_ID')->default(0);
            $table->string('otp');
            $table->dateTime('otpExpirationDate');
            $table->boolean('isUsed')->default(false);
            $table->timestamps();

            $table->unique(['Admin_ID', 'SuperAdmin_ID']);
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
