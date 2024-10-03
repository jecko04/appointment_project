<?php

use App\Http\Middleware\RedirectIfAdmin;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\RedirectIfNotAdmin;
use App\Http\Middleware\RedirectIfNotUsers;
use App\Http\Middleware\RedirectIfUser;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            

        ]);

        $middleware->alias([
            'ifNotUser' => RedirectIfNotUsers::class,
            'IfAuthenticate' => RedirectIfAuthenticated::class,
        ]);
    })
    
    
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

    $app->middleware([
        // Other global middleware
        
    ]);
    // $middlewarePriority->add('admin', [
    //     RedirectIfNotAdmin::class,
    // ]);