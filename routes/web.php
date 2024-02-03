<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ChatController;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(PostController::class)->middleware(['auth'])->group(function(){
    Route::get('/mypage/{user}', 'mypage')->name('mypage');
    Route::get('/', 'home')->name('home');
    Route::get('/create', 'create')->name('create');
    Route::post('/create', 'store')->name('store');
    Route::delete('/post/delete', 'delete')->name('post.delete');
    Route::post('/post/store/like', 'storeLike')->name('post.storeLike');
    Route::delete('/post/delete/like', 'deleteLike')->name('post.deleteLike');
    Route::get('/test', 'test')->name('test');
});

Route::controller(CategoryController::class)->middleware(['auth'])->group(function(){
    Route::post('/follow/category', 'followCategory')->name('follow.category');
    Route::delete('/follow/category', 'unfollowCategory')->name('follow.category');
    Route::get('/category/create', 'create')->name('category.create');
    Route::post('/category/store', 'store')->name('category.store');
    Route::put('/category/display', 'changeDisplay')->name('category.display');
});

Route::controller(CommentController::class)->middleware(['auth'])->group(function(){
    Route::post('/create/comment', 'create')->name('create.comment');
});

Route::controller(ProfileController::class)->middleware(['auth'])->group(function(){
    Route::put('/user/negative', 'changeNoNegative')->name('user.negative');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/chat/{oponent}', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/messages/{oponent}', [ChatController::class, 'fetchMessages'])->name('chat.fetch');
    Route::post('/messages', [ChatController::class, 'sendMessage'])->name('chat.store');
});

require __DIR__.'/auth.php';
