<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;

use App\Http\Resources\BlogCollection;
use App\Http\Resources\BlogResource;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManagerStatic as InterventionImage;



class PostsController extends Controller
{

    public function home(){
        $showBlog = Blog::where(['is_show'=>1, 'is_top'=>1])->latest('updated_at')->take(4)->get();
        
       return Inertia::render('Home',[
        'posts'=>new BlogCollection($showBlog),
    ]);
    }

    public function index(){
        $showBlog = Blog::where('is_show',1)->latest('created_at')->get();
       return Inertia::render('Posts/Index',['loadPosts'=>new BlogCollection($showBlog)]);
    }

    public function show(Request $request){
        
        $id = $request->query('id');

        if($request->query('is_preview') == 1){
            $post = $request->query('data');
            return Inertia::render('Posts/Page',['post'=>$post]);
        }else{
            $post = Blog::find([['id','=' ,$id], ['is_show', '=',1]])->first();
            if($post){
                $category = $post->category;
                $nextId = Blog::where([['id', '>', $id],['is_show', '=',1],['category','=' ,$category]])->min('id');
                //$nextId2 = Blog::where([['id', '<', $id],['is_show', '=',1],['category','=' ,$category]])->min('id');
                $prevId = Blog::where([['id', '<', $id],['is_show', '=',1],['category','=' ,$category]])->max('id');
   
                $prevPost = Blog::where([['id','=' ,$prevId]])->first();
                $nextPost = Blog::where([['id','=' ,$nextId]])->first();
                //$nextPost2 = Blog::where([['id','=' ,$nextId2]])->first();
                //dd(($prevPost));
                return Inertia::render('Posts/Page',['post'=>$post, 'prevPost'=>$prevPost, 'nextPost'=> $nextPost]);

            }else{
                return to_route('blog');
            }   
        }
       
    }

    public function create(Request $request){
        //$latest_id = Blog::latest('id')->first()->id;
        //dd($latest_id);
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request){
        //dd($request->is_top);
        $content= $request->content;
        $thumbnailPath = $request->thumbnail;
        //dd(isset($thumbnailPath));
        //サムネイル格納
        if(!isset($thumbnailPath)){
            $thumbnailPath ='<img src="/userfiles/images/noImage.png" alt="">';
        }
       
        Blog::updateOrCreate(
            ['id'=> $request->id],
            [
            'title' => $request->title,
            'content' => $content,
            'author_id'=>Auth::id(),
            'excerpt'=>$request->excerpt,
            'keywords'=>$request->keywords,
            'category'=>$request->category,
            'tag'=>$request->tag,
            'published_at'=>$request->published_at,
            'thumbnail'=> $thumbnailPath,
            'is_show'=>$request->is_show,
            'is_top'=>$request->is_top,
        ]);

        if($request->is_continue == 1){
            if($request->id){
                $post =Blog::where('id', $request->id)->get();
                return Inertia::render('Posts/Edit',['post'=>$post]);
            }{
               
                $post =Blog::where('id', Blog::latest('id')->first()->id)->get();
                return Inertia::render('Posts/Edit',['post'=>$post]);
            }
        }else{
            return Redirect::to('/blog/admin');
        }
    }

    public function editIndex(){
        return Inertia::render('Posts/EditIndex',['loadPosts'=>new BlogCollection(Blog::latest('updated_at')->get())]);

    }
    
    public function edit(Request $request) {
        $id = $request->query('id');
        $post =Blog::where('id', $id)->get();
        return Inertia::render('Posts/Edit',['post' =>$post]);   
    }

    public function update(Request $request){
        $content= $request->content;
        $thumbnailPath = $request->thumbnail;
        //dd(isset($thumbnailPath));
        //サムネイル格納
        if(!isset($thumbnailPath)){
            $thumbnailPath ='<img src="/userfiles/images/noImage.png" alt="">';
        }
           
            $post = Blog::where('id', $request->id)->update([
                'title' => $request->title,
                'content' => $content,
                'author_id'=>Auth::id(),
                'excerpt'=>$request->excerpt,
                'keywords'=>$request->keywords,
                'category'=>$request->category,
                'tag'=>$request->tag,
                'created_at'=> $request->created_at,
                'thumbnail'=> $thumbnailPath,
                'is_show'=>$request->is_show
            ]);

        
            if($request->is_continue == 1){
                return Inertia::render('Posts/Edit',['post'=>$post]);          
            }else{
                return Redirect::to('/blog/admin');
            }

    }
    public function visible(Request $request){

        $id = $request->query('id');
        
        $is_show =(bool)$request->query('is_show');
        //dd($request);
        if($is_show){
            Blog::where('id', $id)->update([
                'is_show'=>0
            ]);
        }else{
            Blog::where('id', $id)->update([
                'is_show'=>1
            ]);
        }

        return Redirect::back();
        
        
    }
    public function destroy(Request $request)
    {
        //dd($request);
        $id = $request->query('id');
        Blog::where('id', $id)->delete(); 
        return back();
        
       
    }
}