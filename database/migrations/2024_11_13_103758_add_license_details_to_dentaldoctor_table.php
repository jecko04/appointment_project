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
        Schema::table('dentaldoctor', function (Blueprint $table) {
            $table->date('Birth_Date')->nullable()->after('Email');
            $table->string('Profession')->nullable()->after('Birth_Date');
            $table->string('License_Number')->nullable()->after('Profession');
            $table->string('Specialization')->nullable()->after('License_Number');
            $table->date('License_Expiry_Date')->nullable()->after('Specialization');
            $table->boolean('Is_License_Valid')->default(false)->after('License_Expiry_Date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dentaldoctor', function (Blueprint $table) {
            $table->dropColumn(['Birth_Date', 'Profession', 'License_Number', 'Specialization', 'License_Expiry_Date', 'Is_License_Valid']);
        });
    }
};
