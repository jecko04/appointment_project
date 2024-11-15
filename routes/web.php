<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ConsultationAppointmentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DentalNotesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserRecordAppointmentController;
use App\Http\Controllers\UsersAppointmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RescheduleController;
use App\Http\Controllers\ServicesController;

// Route::prefix('api')
//     //->middleware('api')
//     ->group(function() {
//         require base_path('routes/api.php'); 
//     });

Route::get('/', [HomeController::class, 'home'])->name('home');

Route::get('/welcome', function () {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/about', [AboutController::class, 'about'])->name('about');
Route::get('/services', [ServicesController::class, 'services'])->name('services');
Route::get('/contact', [ContactController::class, 'contact'])->name('contact');
Route::get('/location', [LocationController::class, 'location'])->name('location');

//learn how to make route
Route::middleware(['ifNotUser', 'checkAppointment'])->group(function () {
    Route::get('/guest/appointment', [AppointmentController::class, 'appointment'])->name('guest.appointment');
    Route::get('/guest/consultation', [ConsultationAppointmentController::class, 'consult'])->name('guest.consultation');
});


Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::patch('/profile/personal-info', [ProfileController::class, 'updateinfo'])->name('profile.update.info');
    Route::post('/guest/appointment', [AppointmentController::class, 'storeAppointment'])->name('guest.appointment.store');
    Route::post('/guest/consultation', [ConsultationAppointmentController::class, 'storeAppointment'])->name('guest.consultation.store');
    Route::get('/record', [UserRecordAppointmentController::class, 'showRecordAppointment'])->name('record');

    Route::get('/appointment', [UsersAppointmentController::class, 'showUsersAppointment'])->name('appointment');
    Route::patch('/appointment/cancelled{id}', [UsersAppointmentController::class, 'cancelled'])->name('appointment.cancelled');
    
    Route::get('/reschedule', [RescheduleController::class, 'reschedule'])->name('reschedule');
    Route::put('/appointment/reschedule', [RescheduleController::class, 'storeReschedule'])->name('appointment.reschedule');

    Route::get('/Notes', [DentalNotesController::class, 'notes'])->name('notes');



});

require __DIR__.'/auth.php';
