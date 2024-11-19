<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('works', function (Blueprint $table) {
          
            $table->id();
            $table->string('title');
            $table->string('period');
            $table->integer('author_id');
            $table->string('skills');
            $table->string('worktime');
            $table->string('url');
            $table->string('git');
            $table->text('remarks');
            $table->string('thumbnail');
            $table->string('pc_appearance');
            $table->string('sp_appearance');
            $table->string('pc_appearance02')->nullable();
            $table->string('sp_appearance02')->nullable();
 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
