<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\AppointController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserRecordAppointmentController;
use App\Http\Controllers\UsersAppointmentController;
use App\Http\Middleware\RedirectIfNotAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authentication routes
Route::post('/admin/login', [AdminLoginController::class, 'login'])->name('admin.login.submit');
Route::post('/admin/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');


Route::middleware('ifAdmin')->group(function () {
    Route::get('/admin/login', [AdminLoginController::class, 'showAdminLogin'])->name('admin.login');
});
 
// Dashboard route
Route::middleware('IfNotAdmin')->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'showAdminDashboard'])->name('admin.dashboard');
});

//learn how to make route
Route::middleware('ifNotUser')->group(function (){
    Route::get('/appointment', [UsersAppointmentController::class, 'showUsersAppointment'])->name('appointment');
    Route::get('/record', [UserRecordAppointmentController::class, 'showRecordAppointment'])->name('record');
});

// Route::middleware('ifNotUser')->group(function () {
//     Route::get('/dashboard', )
// });
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
// Route::get('/dashboard', function () {
// //     return Inertia::render('Dashboard');
// // })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
