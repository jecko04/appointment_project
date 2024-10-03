<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class HomeController extends Controller
{
    // Method for the home page
    public function home()
    {
        return Inertia::render('Welcome');
    }
}
