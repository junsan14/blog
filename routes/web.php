<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ShowBlogController;
use App\Http\Controllers\MailController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/





Route::get('/',  [PostsController::class, 'home'])->name('home');
Route::get('/about', function () {return Inertia::render('About');})->name('about');
Route::get('/contact', [MailController::class, 'index'])->name('contact');
Route::post('/contact', [MailController::class, 'send']);
Route::get('/blog', [PostsController::class, 'index'])->name('blog');
Route::get('/blog/page', [PostsController::class, 'show'])->name('page');









Route::middleware('auth')->group(function () {
    Route::get('/blog/admin',  [PostsController::class, 'editIndex']);

    Route::get('/blog/admin/create', [PostsController::class, 'create']);
    Route::get('/blog/page?id={id}?_preview',[PostsController::class, 'show'])->name('preview');

   

    Route::patch('/blog/admin/create',[PostsController::class, 'tempStore']);

    Route::post('/blog/admin/create', [PostsController::class, 'update']);

    Route::get('/blog/admin/editIndex', [PostsController::class, 'editIndex']);
    Route::patch('/blog/admin/editIndex', [PostsController::class, 'visible']);
    Route::delete('/blog/admin/editIndex', [PostsController::class, 'destroy']);

    Route::get('/blog/admin/edit', [PostsController::class, 'edit']);
    Route::patch('/blog/admin/edit', [PostsController::class, 'update']);
   

    

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
