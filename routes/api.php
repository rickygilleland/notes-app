<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/notes', 'NoteController@get_all_notes', function () {
	
});

Route::get('/note/{id}', 'NoteController@get_note', function ($id) {
	
});

Route::post('/note', 'NoteController@create_note', function (Request $request) {
	
});

Route::put('/note/{id}', 'NoteController@update_note', function ($id) {
	
});

Route::delete('/note/{id}', 'NoteController@delete_note', function ($id) {
	
});
