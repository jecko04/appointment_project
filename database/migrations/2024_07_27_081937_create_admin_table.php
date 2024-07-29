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
        Schema::create('admin', function (Blueprint $table) {
            $table->id('Admin_ID');
            $table->string('Name');
            $table->string('Email');
            $table->string('Password');
            $table->unsignedBigInteger('CreatedBy');
            $table->unsignedBigInteger('Branch_ID');
            $table->unsignedBigInteger('Role_ID');
            $table->timestamps();

            $table->foreign('CreatedBy')->references('SuperAdmin_ID')->on('superadmin');
            $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade');
            $table->foreign('Role_ID')->references('Role_ID')->on('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin');
    }
};
