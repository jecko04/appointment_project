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
        Schema::create('token_desktop', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('Admin_ID')->nullable();
            $table->string('email');
            $table->string('token');
            $table->dateTime('tokenExpirationDate');
            $table->boolean('isUsed')->default(false);
            $table->timestamps();

            $table->foreign('Admin_ID')->references('Admin_ID')->on('admin')->onDelete('cascade');

            $table->unique(['email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('token_desktop');
    }
};
