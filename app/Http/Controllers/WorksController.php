<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Work;

class WorksController extends Controller
{
    public function index(){
        $works = Work::get();
        return Inertia::render('Works/WorksIndex',['works'=>$works]);

    }
     public function show(Request $request){
        $id = $request->query('id');
        $work = Work::find([['id','=' ,$id]])->first();
          //dd($work);
        if($work){
            return Inertia::render('Works/Work',['work'=>$work]);

        }else{
            return to_route('works');
        }   
        
       
    }
}
