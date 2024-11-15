<?php

namespace App\Http\Controllers;

use App\Models\NotesModel;
use App\Models\RescheduleReasonsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DentalNotesController extends Controller
{
    public function notes() {

        $userId = Auth::id(); 
        $notes = NotesModel::where('user_id', $userId)
        ->get();

        $reschedule_reasons = RescheduleReasonsModel::with('appointment', 'users')
        ->where('user_id', $userId)
        ->whereHas('appointment', function ($query) {
            $query->where('status', 'approved')
            ->latest();
        })
        ->get();

        return Inertia::render('Auth/Notes', [
            'notes' => $notes,
            'reschedule_reasons' => $reschedule_reasons,
        ]);
    }

    public function destroy() {
        
    }
}
