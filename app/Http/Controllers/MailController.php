<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class MailController extends Controller
{


    public function index(){
        return Inertia::render('Contact')->withViewData(['sccuess' =>'no']);
    }

    public function send(Request $request)
    {
        
        $content = $request->content;

        // 注文の発送処理…

        Mail::to($request->user_email)->send(new ContactMail($request));
       
        return Inertia::render('Contact')->withViewData(['sccuess' =>'ok']);
    }
    
}
