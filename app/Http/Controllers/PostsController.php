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
        $showBlog = Blog::where(['is_show'=>1, 'is_top'=>1])->latest('published_at')->take(4)->get();
       return Inertia::render('Home',[
        'loadPosts'=>new BlogCollection($showBlog),
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
                $tag = $post->tag;
                $relevantNextPostId = Blog::where([
                    ['tag', 'like', "%{$tag}%"],['is_show', '=',1],['category','=' ,$post->category],
                    ['id','!=',$post->id], ['id','>',$post->id], ])->min('id');
                $relevantPrevPostId = Blog::where([
                    ['tag', 'like', "%{$tag}%"],['is_show', '=',1],['category','=' ,$post->category],
                    ['id','!=',$post->id], ['id','<',$post->id], ])->max('id');
                $relevantPosts =  Blog::where(['id'=>$relevantNextPostId])->orWhere(['id'=>$relevantPrevPostId])->get();
                //dd(isEmpty($relevantPosts));
                return Inertia::render('Posts/Page',['pageData'=>$post, 'relevantPosts'=>$relevantPosts])
                ->withViewData(['meta'=> 
                        ['title'=>"Post_".$post['title'],
                         'thumbnail'=>$post['thumbnail'],
                         'excerpt'=>$post['excerpt']]]);

            }else{
                return to_route('blog');
            }   
        }
       
    }

    public function create(Request $request){
        $keywords = Blog::latest('updated_at')->first(['keywords']);
        $tags = Blog::groupBy('tag')->get(['tag']);
        //dd($keywords);
        return Inertia::render('Posts/Create', ['keywords'=>$keywords, 'tags'=>$tags]);
    }

    public function store(Request $request){
        //dd($request->is_top);
        $content= $request->content;
        $thumbnailPath = $request->thumbnail;
       //dd($request);
        //dd(isset($thumbnailPath));
        //サムネイル格納
        if(!isset($thumbnailPath)){
            $thumbnailPath ='<img src="/userfiles/images/noImage.png" alt="">';
        }
        if($request->is_show == 0){
       
            $publish_at = null;
        }else{
            if($request->published_at){
                $publish_at = $request->published_at;
            }else{
                //dd(Carbon::now()->toDateTimeString());
                $today = Carbon::now()->toDateTimeString();
                $publish_at = $today;
                //dd($publish_at);
            }
            
        }
       //dd($publish_at);
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
            'published_at'=>$publish_at,
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
        $keywords = Blog::latest('updated_at')->first(['keywords']);
        $post =Blog::where('id', $id)->get();
        $tags = Blog::groupBy('tag')->get(['tag']);
        return Inertia::render('Posts/Edit',['post' =>$post, 'tags'=>$tags,'keywords'=>$keywords,]);   
    }

    public function update(Request $request){
        $content= $request->content;
        $thumbnailPath = $request->thumbnail;
        dd($request);
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
                'is_show'=>0,
                'updated_at' => Blog::raw('updated_at')
            ]);
        }else{
            Blog::where('id', $id)->update([
                'is_show'=>1,
                'updated_at' => Blog::raw('updated_at')
            ]);
        }

        return Redirect::back();
        //return Redirect::to('/blog/admin');
        //return redirect()->back();
        
        
    }
    public function destroy(Request $request)
    {
        //dd($request);
        $id = $request->query('id');
        Blog::where('id', $id)->delete(); 
        return back();
        
       
    }
}