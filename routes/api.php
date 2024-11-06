<?php 

//For Mobile Access

use App\Http\Controllers\Mobile\MobileAppointment2Controller;
use App\Http\Controllers\Mobile\MobileAppointmentController;
use App\Http\Controllers\Mobile\MobileLoginController;
use Illuminate\Support\Facades\Route;

// Route::prefix('api')->middleware('crftToken')->group(function () {
// });
Route::post('/mobile/login', [MobileLoginController::class, 'login'])->name('mobile.login');

Route::middleware(['auth:api_dentaldoctor', 'isDentalDoctor'])->group(function () {
    Route::get('/mobile/appointment', [MobileAppointmentController::class, 'appointment'])->name('mobile.appointment');
    Route::get('/mobile/appointment2', [MobileAppointment2Controller::class, 'appointment2'])->name('mobile.appointment2');
});






?>