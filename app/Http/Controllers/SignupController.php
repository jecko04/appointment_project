<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function Signup()
    {
        return view('Users.signup'); 
    }
}
