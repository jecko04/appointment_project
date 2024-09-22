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
        Schema::create('categories', function (Blueprint $table) {
            $table->id('Categories_ID');
            $table->string('Title');
            $table->text('Description');
            $table->string('Duration'); 
            $table->string('Frequency');
            $table->decimal('Price', 8, 2);
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
        Schema::dropIfExists('categories');
    }
};
