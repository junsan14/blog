<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'content',
        'author_id',
        'excerpt',
        'keywords',
        'category',
        'tag',
        'thumbnail',
        'is_show',
        'published_at'


       
    ];
    protected $table = 'posts';
    public function index(){
        return $table;
    }
 

}
