<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function showAdminDashboard()
    {
        return Inertia::render('Admin/AdminDashboard');
    }
}
