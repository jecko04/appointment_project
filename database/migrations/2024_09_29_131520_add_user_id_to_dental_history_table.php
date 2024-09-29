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
        Schema::table('dental_history', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->after('id');

            // Define the foreign key constraint to reference the users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dental_history', function (Blueprint $table) {
            $table->dropForeign(['id']);
            $table->dropColumn('id');
        });
    }
};