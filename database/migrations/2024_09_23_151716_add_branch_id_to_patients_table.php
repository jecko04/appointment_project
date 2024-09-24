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
        Schema::table('patients', function (Blueprint $table) {
            $table->unsignedBigInteger('Branch_ID')->after('emergency_contact'); // Add Branch_ID column
            $table->foreign('Branch_ID')->references('Branch_ID')->on('branch')->onDelete('cascade'); // Add foreign key constraint
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropForeign(['Branch_ID']); // Drop foreign key constraint
            $table->dropColumn('Branch_ID'); // Drop Branch_ID column
        });
    }
};
