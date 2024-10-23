<?php

namespace App\Http\Controllers;

use App\Models\BranchModel;
use App\Models\ServicesModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function services() 
    {
        $branches = BranchModel::all(); 
        $categories = ServicesModel::with('branch')->get();

        return Inertia::render('Guest/Services', [
            'categories' => $categories,
            'branches' => $branches->isNotEmpty() 
            ? $branches->map(function ($branch) {
                return [
                'Branch_ID' => $branch->Branch_ID,
                'BranchName' => $branch->BranchName,
                ];
                }) 
                : null,
        ]);
    }
}
