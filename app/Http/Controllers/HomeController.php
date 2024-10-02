<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    // Method for the home page
    public function showHome()
    {
        return view('home'); 
    }
}
