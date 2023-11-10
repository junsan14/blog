<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\BlogCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


class PostsController extends Controller
{

    public function home(){
        $showBlog = Blog::where('is_show',1)->latest()->take(4)->get();
       return Inertia::render('Home',['posts'=>new BlogCollection($showBlog)]);
    }

    public function index(){
        $showBlog = Blog::where('is_show',1)->latest()->get();
       return Inertia::render('Posts/Index',['posts'=>new BlogCollection($showBlog)]);
    }

    public function show(Request $request){
        $id = $request->query('id');
        if($request->query('is_preview') == 1){
            $post = $request->query('data');
       
            return Inertia::render('Posts/Page',['post'=>$post]);
        }else{
            $post = Blog::where([['id','=' ,$id], ['is_show', '=',1]])->get();
            
            if(!$post->isEmpty()){
                return Inertia::render('Posts/Page',['post'=>$post]);
            }else{
                return to_route('blog');
            }
           
        }
       
    }

    public function create(){
       
        $id = Blog::latest('id')->first()->id; 
        return Inertia::render('Posts/Create', ['id'=>$id]);
    }

    public function tempStore(Request $request){
        $uploadFiles = $request->wysiwygData;
        $content= $request->content;
        
        //サムネイル格納
        if($request->file('thumbnail')){
            $thumbnailName = $request->file('thumbnail')->getClientOriginalName();  
            $thumbnailPath =str_replace('public', '/storage',$request->file('thumbnail')
                            ->storeAs('public/images/blog/thumbnail',$thumbnailName));     
        }else{
            $thumbnailPath ='/storage/images/blog/thumbnail/noImage.png';
        }

        if($uploadFiles){
            foreach($uploadFiles as $uploadFile){
                $fileName = $uploadFile->getClientOriginalName();
                $path = str_replace('public', '/storage',$uploadFile
                        ->storeAs('public/images/blog/post',$fileName));
                $base64 = array_search($uploadFile, $uploadFiles);
                $content = str_replace($base64,$path,$content);
            }
        }

        $post = Blog::updateOrCreate(
            ['id'=> $request->id],
            [
            'title' => $request->title,
            'content' => $content,
            'author_id'=>Auth::id(),
            'excerpt'=>$request->excerpt,
            'keywords'=>$request->keywords,
            'category'=>$request->category,
            'tag'=>$request->tag,
            'thumbnail'=> $thumbnailPath,
            'is_show'=>$request->is_show
        ]);

    
            return back();
        
       


    }
    public function store(Request $request){

        $uploadFiles = $request->wysiwygData;
        $content= $request->content;

        //サムネイル格納
            if($request->file('thumbnail')){
                $thumbnailName = $request->file('thumbnail')->getClientOriginalName();  
                $thumbnailPath =str_replace('public', '/storage',$request->file('thumbnail')
                                ->storeAs('public/images/blog/thumbnail',$thumbnailName));     
            }else{
                $thumbnailPath ='/storage/images/blog/thumbnail/noImage.png';
            }

        if($uploadFiles){
            foreach($uploadFiles as $uploadFile){
                $fileName = $uploadFile->getClientOriginalName();
                $path = str_replace('public', '/storage',$uploadFile
                        ->storeAs('public/images/blog/post',$fileName));
                $base64 = array_search($uploadFile, $uploadFiles);
                $content = str_replace($base64,$path,$content);
               }
        }
        if($request->id){
            $post = Blog::where('id', $request->id)->update([
                'title' => $request->title,
                'content' => $content,
                'author_id'=>Auth::id(),
                'excerpt'=>$request->excerpt,
                'keywords'=>$request->keywords,
                'category'=>$request->category,
                'tag'=>$request->tag,
                'thumbnail'=> $thumbnailPath,
                'is_show'=>$request->is_show
            ]);
            if($request->is_autosave === 1){
                $id = Blog::latest('id')->first()->id; 
                return Inertia::render('Posts/Create',['id'=>$id]); 
            }else{
             
                return Redirect::to('/blog/admin')->with('scuess', '投稿が完了しました');
            }
            
        }else{
            $post = Blog::create(
                [
                'title' => $request->title,
                'content' => $request->content,
                'author_id'=>Auth::id(),
                'excerpt'=>$request->excerpt,
                'keywords'=>$request->keywords,
                'category'=>$request->category,
                'tag'=>$request->tag,
                'thumbnail'=> $request->thumbnail,
                'is_show'=>$request->is_show
            ]);
            if($request->is_autosave === 1){
                $id = Blog::latest('id')->first()->id; 
                return Inertia::render('Posts/Create',['id'=>$id]); 
            }else{
             
                return Redirect::to('/blog/admin')->with('scuess', '投稿が完了しました');
            } 
        }

             
    }

    public function editIndex(){
        return Inertia::render('Posts/EditIndex',['posts'=>new BlogCollection(Blog::latest()->get())]);
    }
    
    public function edit(Request $request) {
        $id = $request->query('id');
        $post =Blog::where('id', $id)->get();
        return Inertia::render('Posts/Edit',[$post]);   
    }

    public function update(Request $request){
 
        $uploadFiles = $request->wysiwygData;
        $content= $request->content;
        if($request->file('thumbnail')){
            $thumbnailName = $request->file('thumbnail')->getClientOriginalName();  
            $thumbnailPath =str_replace('public', '/storage',$request->file('thumbnail')
                            ->storeAs('public/images/blog/thumbnail',$thumbnailName));
        }else{
            $thumbnailPath = $request->thumbnail;
        }

   
        if($uploadFiles){
            foreach($uploadFiles as $uploadFile){
                $fileName = $uploadFile->getClientOriginalName();
                $path = str_replace('public', '/storage',$uploadFile
                        ->storeAs('public/images/blog/post',$fileName));
                $base64 = array_search($uploadFile, $uploadFiles);
                $content = str_replace($base64,$path,$content);
            }
        }
           
            
    
            $post = Blog::where('id', $request->id)->update([
                'title' => $request->title,
                'content' => $content,
                'author_id'=>Auth::id(),
                'excerpt'=>$request->excerpt,
                'keywords'=>$request->keywords,
                'category'=>$request->category,
                'tag'=>$request->tag,
                'thumbnail'=> $thumbnailPath,
                'is_show'=>$request->is_show
            ]);

        
        return Redirect::to('/blog/admin')->with('scuess', '投稿の編集が完了しました');

    }
    public function visible(Request $request){

        $id = $request->query('id');
        $is_show =(bool)$request->query('is_show');
       
        if($is_show){
            Blog::where('id', $id)->update([
                'is_show'=>0
            ]);
        }else{
            Blog::where('id', $id)->update([
                'is_show'=>1
            ]);
        }
       
        return back();
        
        
    }
    public function destroy(Request $request)
    {
        $id = $request->query('id');
        Blog::where('id', $id)->delete();   
        return back();
    }
}