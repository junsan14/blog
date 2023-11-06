<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class ShowUsersController extends Controller
{
    public function index(){
        $users = User::where('id', 1)->get();
        foreach ($users as $user) {
            echo $user->name;
        }
    }
    
}
