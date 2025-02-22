<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;



class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $title = "Renamed imports";
        $excerpt = "+ import createServer from '@inertiajs/react/server'";
        $content = "Next, update all the Inertia related imports in your project to use the new adapter library name. All imports are now available from the adapter library, meaning you no longer import anything from the Inertia core library, progress library, or server library.

        Additionally, some exports have been renamed and previously deprecated exports have been removed. For example, the Inertia export has been renamed to router.
        
        Here is a complete list of all the import changes:";
        $keywords ="laravel, interia";
        $category="5";
        $tag="laravel, interia";
        for($i=0;$i<5;$i++){
            DB::table('posts')->insert([
            'title' =>  str()->random(),
            'author_id' => 0,
            'excerpt' =>  str()->random(),
            'keywords' =>  str()->random(),
            'content' =>  str()->random(),
            'category' => $category,
            'tag' => $tag,
            'thumbnail' => Str::random(10).'img',
            'is_top' => true,
            'is_show' => true,
        ]);
        }
        
    }
}
