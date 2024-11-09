<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->updateOrInsert(
            ['Role_ID' => 1], // Unique identifier to ensure one SuperAdmin
            [
                'SuperAdmin_ID' => 1,
                'Name' => 'smtc dental care',
                'Email' => 'smtc.dentalcare@gmail.com',
                'Password' => Hash::make('Dental@care123'), // Use a secure password here
                'Role_ID' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        );
    }
}
