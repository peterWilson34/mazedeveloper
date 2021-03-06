<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Queue\RedisQueue;
use App\Instructor;
use App\Student;
use DB;

class NotificationController extends Controller
{
    //
    public function get_notification_num(Request $request)
    {

        $notification =0;
        $user_id = $request->input('id');
        $user_type = $request->input('type');

        if (session('user_id') == $user_id && session('type') == $user_type && $user_id!=null )
        {

            //->select(DB::raw('count(*) as user_count, status'))
            //return $user_id;

            if ($user_type == 'student')
            {

                $last_hit= Student::select('last_hit')->where('id',$user_id)->first();



                $notification = DB::table('notifications')
                    ->join('student_notifications', 'notifications.id', '=', 'student_notifications.notification_id')
                    ->where([
                        ['student_notifications.student_id','=',$user_id ],
                        ['notifications.time','>',$last_hit->last_hit],
                    ])
                    ->select(DB::raw('count(*) as count'))
                    ->get();
            }
            else
            {
                //return "opa alaalaa";


                $last_hit = Instructor::select('last_hit')->where('id', $user_id)->first();


                $notification = DB::table('notifications')
                    ->join('instructor_notifications', 'notifications.id', '=', 'instructor_notifications.notification_id')
                    ->where([
                        ['instructor_notifications.instructor_id', '=', $user_id],
                        ['notifications.time', '>', $last_hit->last_hit]
                    ])
                    ->select(DB::raw('count(*) as count'))
                    ->get();
            }

        }
        return $notification;


    }

    public function get_notification_data(Request $request)
    {

        $notification =0;
        $user_id = $request->input('id');
        $user_type = $request->input('type');
//        $user_id=1;
//        $user_type="student";

        if (session('user_id') == $user_id && session('type') == $user_type && $user_id!=null )
        {

            if ($user_type == 'student')
            {
                $last_hit= Student::select('last_hit')->where('id',$user_id)->first();
                $notification = DB::table('notifications')
                    ->join('student_notifications', 'notifications.id', '=', 'student_notifications.notification_id')
                    ->where([
                        ['student_notifications.student_id','=',$user_id ],
                        ['notifications.time','>',$last_hit->last_hit],
                    ])
                    ->select('notifications.type','notifications.content','notifications.time')
                    ->get();
            }
            else
            {
                //return "opa alaalaa";


                $last_hit = Instructor::select('last_hit')->where('id', $user_id)->first();


                $notification = DB::table('notifications')
                    ->join('instructor_notifications', 'notifications.id', '=', 'instructor_notifications.notification_id')
                    ->where([
                        ['instructor_notifications.instructor_id', '=', $user_id],
                        ['notifications.time', '>', $last_hit->last_hit]
                    ])
                    ->select('notifications.type','notifications.content','notifications.time')
                    ->get();
            }

        }
        return $notification;


    }
}
