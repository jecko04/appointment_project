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
        Schema::create('medical_history', function (Blueprint $table) {
            $table->id(); // Medical History ID
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade'); // Foreign key
            $table->text('medical_conditions')->nullable();
            $table->text('current_medications')->nullable();
            $table->text('allergies')->nullable();
            $table->text('past_surgeries')->nullable();
            $table->text('family_medical_history')->nullable();
            $table->string('blood_pressure')->nullable();
            $table->boolean('heart_disease')->default(false);
            $table->boolean('diabetes')->default(false);
            $table->boolean('smoker')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_history');
    }
};
