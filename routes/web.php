<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ShowBlogController;
use App\Http\Controllers\WorksController;
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
Route::post('/contact', [MailController::class, 'send'])->name('contact.send');
Route::get('/blog', [PostsController::class, 'index'])->name('blog');
Route::get('/blog/page', [PostsController::class, 'show'])->name('page');

Route::get('/works',[WorksController::class, 'index'])->name('works');
Route::get('/works/work', [WorksController::class, 'show'])->name('work');



Route::middleware('auth')->group(function () {
    Route::get('/blog/admin',  [PostsController::class, 'editIndex'])->name('admin');

    Route::get('/blog/admin/create', [PostsController::class, 'create'])->name('page.create');
    Route::get('/blog/page?id={id}?_preview',[PostsController::class, 'show'])->name('page.preview');

   
  
    Route::patch('/blog/admin/create',[PostsController::class, 'tempStore'])->name('page.temStore');

    Route::post('/blog/admin/create', [PostsController::class, 'store'])->name('page.store');

    Route::get('/blog/admin/editIndex', [PostsController::class, 'editIndex'])->name('blog.edit');
    Route::patch('/blog/admin/editIndex', [PostsController::class, 'visible'])->name('page.visible');
    Route::delete('/blog/admin/editIndex', [PostsController::class, 'destroy'])->name('page.destroy');

    Route::get('/blog/admin/edit', [PostsController::class, 'edit'])->name('page.edit');
    Route::post('/blog/admin/edit', [PostsController::class, 'update'])->name('page.update');
   

    

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
