<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Requests;

Route::get('/', function () {
    return view('index');
});
Route::get('/test', function () {
    return view('test');
});
Route::post('/login','StudentController@login' );

Route::post('/accept','AnswerController@accept_answer');

Route::post('/unaccept','AnswerController@unaccept_answer');

Route::post('/ask','QuestionController@add_question');


//**by caroline *** after login go to home to show couses && questions
Route::post('/getuserdata','StudentController@gethomeuserdata');



Route::post('/gettags','TagController@get_tag');

/***** by christina *****/
Route::post('/addanswer','AnswerController@add_answer');

Route::post('/questiondata','QuestionController@get_question');
Route::post('/complete','QuestionController@complete');


/*******by merna ********/
Route::post('/questioncomment','CommentController@comment');
Route::post('/answerreply','ReplyController@reply');
Route::post('/getnotifications','NotificationController@get_notification_num');

//**by caroline *** routes for edit question && edit answer

Route::post('/editquestion','QuestionController@edit_question');

Route::post('/editanswer','AnswerController@edit_answer');

Route::post('/likeaction','AnswerController@like_action');

Route::post('/dislikeaction','AnswerController@dislike_action');
Route::post('/removelike','AnswerController@like_remove');
Route::post('/removedislike','AnswerController@dislike_remove');
Route::post('/getnotificationsdata','NotificationController@get_notification_data');






