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
        Schema::table('dental_services', function (Blueprint $table) {
            $table->unsignedBigInteger('Categories_ID')->after('dentalservices_id');
            $table->unsignedBigInteger('OfficeHour_ID')->after('categories_id');

            // Foreign key constraints
            $table->foreign('Categories_ID')->references('Categories_ID')->on('categories')->onDelete('cascade');
            $table->foreign('OfficeHour_ID')->references('OfficeHour_ID')->on('office_hours')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dental_services', function (Blueprint $table) {
            $table->dropForeign(['categories_id']);
            $table->dropForeign(['officehour_id']);
    
            // Drop columns
            $table->dropColumn(['categories_id', 'officehour_id']);
        });
    }
};
