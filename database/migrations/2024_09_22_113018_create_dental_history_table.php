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
        Schema::create('dental_history', function (Blueprint $table) {
            $table->id(); // Dental History ID
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade'); // Foreign key
            $table->date('last_dental_visit')->nullable();
            $table->text('past_dental_treatments')->nullable();
            $table->boolean('frequent_tooth_pain')->default(false);
            $table->boolean('gum_disease_history')->default(false);
            $table->boolean('teeth_grinding')->default(false);
            $table->string('tooth_sensitivity')->nullable();
            $table->boolean('orthodontic_treatment')->default(false);
            $table->boolean('dental_implants')->default(false);
            $table->boolean('bleeding_gums')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dental_history');
    }
};
