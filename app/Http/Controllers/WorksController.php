<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Work;
use Illuminate\Support\Facades\Redirect;
class WorksController extends Controller
{
    public function index(){
        $works = Work::get();
        return Inertia::render('Works/WorksIndex',['works'=>$works]);

    }
    public function editIndex(){
        return Inertia::render('Works/WorksEditIndex',
            ['works'=>Work::get()]);

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
     public function create(Request $request){
        return Inertia::render('Works/CreateWork');
    }
     public function store(Request $request){
        
        $content= $request->content;
       //dd($request->title);
        //dd(isset($thumbnailPath));
       //dd(Auth::id());
        Work::updateOrCreate(
            ['id'=> $request->id],
            [
            'title' => $request->title,
            'author_id'=>Auth::id(),
            'period'=>$request->period,
            'frameworks'=>$request->frameworks,
            'worktime'=>$request->worktime,
            'url'=>$request->url,
            'git'=>$request->git,
            'remarks'=> $request->remarks,
            'thumbnail'=>$request->thumbnail,
            'pc_appearance'=>$request->pc_appearance,
            'pc_appearance02'=>$request->pc_appearance02,
            'sp_appearance'=>$request->sp_appearance,
            'sp_appearance02'=>$request->sp_appearance02,
            'created_at'=>$request->created_at,
            'updated_at'=>$request->updated_at,
        ]);

        
        return Redirect::to('works/editIndex');
        
    }
    public function edit(Request $request) {
        $id = $request->query('id');
        $work =Work::where('id', $id)->get();
        //dd($work);
        return Inertia::render('Works/EditWork',['work' =>$work]);   
    }

}
