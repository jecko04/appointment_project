<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserRecordAppointmentController;
use App\Http\Controllers\UsersAppointmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UpdatePersonalInfomationFormController;

Route::get('/', function () {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [HomeController::class, 'home'])->name('home');

//learn how to make route
Route::middleware('ifNotUser')->group(function (){
    Route::get('/appointment', [UsersAppointmentController::class, 'showUsersAppointment'])->name('appointment');
    Route::get('/record', [UserRecordAppointmentController::class, 'showRecordAppointment'])->name('record');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/personal-info', [UpdatePersonalInfomationFormController::class, 'updateinfo'])->name('profile.update.personalinfo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
