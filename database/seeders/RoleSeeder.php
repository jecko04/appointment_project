<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('roles')->count() === 0) {
            DB::table('roles')->insert([
                ['Role_ID' => 1, 'RoleName' => 'SuperAdmin', 'created_at' => now(), 'updated_at' => now()],
                ['Role_ID' => 2, 'RoleName' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
                ['Role_ID' => 3, 'RoleName' => 'User', 'created_at' => now(), 'updated_at' => now()],
            ]);
        }
    }
}
