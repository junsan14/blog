<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'period',
        'frameworks',
        'worktime',
        'url',
        'git',
        'remarks',
        'title',
        'thumbnail',
        'pc_appearance',
        'pc_appearance02',
        'sp_appearance',
        'sp_appearance02',
        'author_id',
        'updated_at'


       
    ];
}
