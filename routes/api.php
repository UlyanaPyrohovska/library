<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\KeyWordController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PubHouseController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
});

Route::apiResource('news', NewsController::class);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('category', CategoryController::class);
Route::apiResource('authors', AuthorController::class);
Route::apiResource('resources', BookController::class);
Route::apiResource('keywords', KeyWordController::class);
Route::apiResource('pubhouse', PubHouseController::class);
Route::get('/news/get-by-slug/{news:slug}', [NewsController::class, 'getBySlug']);