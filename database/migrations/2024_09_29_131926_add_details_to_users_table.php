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
        Schema::table('users', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable()->after('password');
            $table->string('age')->nullable()->after('date_of_birth'); 
            $table->string('gender')->nullable()->after('age'); 
            $table->string('phone')->nullable()->after('gender'); 
            $table->string('address')->nullable()->after('phone'); 
            $table->string('emergency_contact')->nullable()->after('address'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['date_of_birth', 'age', 'gender', 'phone', 'address', 'emergency_contact']);
        });
    }
};
