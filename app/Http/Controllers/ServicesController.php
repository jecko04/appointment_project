<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function services() 
    {
        return Inertia::render('Guest/Services');
    }
}
