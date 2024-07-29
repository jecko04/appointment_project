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
        Schema::create('branch', function (Blueprint $table) {
            $table->id('Branch_ID');
            $table->string('BranchName');
            $table->string('BuildingNumber')->nullable();
            $table->string('Street')->nullable();
            $table->string('Barangay')->nullable();
            $table->string('City')->nullable();
            $table->string('Province')->nullable();
            $table->string('PostalCode')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branch');
    }
};
