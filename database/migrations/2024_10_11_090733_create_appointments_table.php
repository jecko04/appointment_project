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
            $table->id(); 
                $table->unsignedBigInteger('user_id'); 
                $table->unsignedBigInteger('selectedBranch'); 
                $table->unsignedBigInteger('selectServices'); 
                $table->date('appointment_date'); 
                $table->time('appointment_time'); 
                $table->date('reschedule_date')->nullable();
                $table->time('reschedule_time')->nullable();
                $table->enum('status', ['pending', 'approved', 'cancelled', 'completed'])->default('pending');
                $table->string('qr_code')->nullable();
                $table->boolean('check_in')->default(false);
                $table->timestamps();
    
                // Foreign keys
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('selectedBranch')->references('Branch_ID')->on('branch')->onDelete('cascade');
                $table->foreign('selectServices')->references('Categories_ID')->on('categories')->onDelete('cascade'); 
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
