<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Inertia\Inertia;
use App\Http\Resources\BlogCollection;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Blog;
class MailController extends Controller
{


    public function index(){
        return Inertia::render('Contact');
    }

    public function send(Request $request)
    {
        
        $content = $request->content;
        //Mail::to($request->user_email)->send(new ContactMail($request));
        $showBlog = Blog::where('is_show',1)->latest()->take(4)->get();
        return Inertia::render('Home',[
            'is_success'=>true,
            'posts'=>new BlogCollection($showBlog)
        ]);
    }
    
}
