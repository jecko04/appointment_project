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
        Schema::create('access_account', function (Blueprint $table) {
            $table->id('access_id');
            $table->unsignedBigInteger('Admin_ID');
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->unsignedBigInteger('Branch_ID');
            $table->timestamps();

            $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade');
            $table->foreign('Admin_ID')->references('Admin_ID')->on('admin')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_account');
    }
};
