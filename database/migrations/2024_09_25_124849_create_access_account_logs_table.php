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
        Schema::create('access_account_logs', function (Blueprint $table) {
            $table->id(); 
            $table->string('username'); 
            $table->unsignedBigInteger('Branch_ID'); 
            $table->timestamp('login_time'); 
            $table->boolean('successful');
            $table->string('ip_address', 50)->nullable(); 
            
            // Foreign key constraint
            $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_account_logs');
    }
};
