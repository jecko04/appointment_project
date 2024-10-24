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
            'categories' => $categories->isNotEmpty()
            ? $categories->map(function ($category) {
                return [
                    'Categories_ID' => $category->Categories_ID,
                    'Title' => $category->Title,
                    'Description' => $category->Description,
                    'Duration' => $category->Duration,
                    'Frequency' => $category->Frequency,
                    'Price' => $category->Price,

                    'Branch' => $category->branch ? [
                        'Branch_ID' => $category->branch->Branch_ID,
                        'BranchName' => $category->branch->BranchName,
                    ] : null,
                ];
            }) : null,
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
