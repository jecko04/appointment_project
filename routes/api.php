<?php 

//For Mobile Access

use App\Http\Controllers\Mobile\MobileAppointment2Controller;
use App\Http\Controllers\Mobile\MobileAppointmentController;
use App\Http\Controllers\Mobile\MobileDashboardController;
use App\Http\Controllers\Mobile\MobileLoginController;
use App\Http\Controllers\Mobile\MobileLogoutController;
use App\Http\Controllers\Mobile\MobileSetPasswordController;
use App\Http\Controllers\Mobile\MobileSetProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:api'])->group(function () {
    Route::post('/mobile/login', [MobileLoginController::class, 'login'])->name('mobile.login');
    // Other API routes
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/mobile/logout', [MobileLogoutController::class, 'logout'])->name('mobile.logout');

    Route::get('/mobile/appointment', [MobileAppointmentController::class, 'appointment'])->name('mobile.appointment');
    Route::get('/mobile/appointment2', [MobileAppointment2Controller::class, 'appointment2'])->name('mobile.appointment2');
    Route::get('/mobile/dashboard', [MobileDashboardController::class, 'dashboard'])->name('mobile.dashboard');

    Route::get('/mobile/name', [MobileDashboardController::class, 'name'])->name('mobile.name');

    Route::get('/mobile/getProfile', [MobileSetProfileController::class, 'getProfile'])->name('mobile.getProfile');
    Route::post('/mobile/setProfile', [MobileSetProfileController::class, 'setProfile'])->name('mobile.setProfile');
    
    Route::post('/mobile/change', [MobileSetPasswordController::class, 'change'])->name('mobile.change');
});






?>