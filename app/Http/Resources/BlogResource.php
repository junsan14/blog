<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'category' => $this->category,
            'keywords' => $this->keywords,
            'tag' => $this->tag,
            'content' => $this->content,
            'thumbnail' => $this->thumbnail,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'published_at' => $this->published_at,
            'is_show' => (bool)$this->is_show,
            'is_top' => (bool)$this->is_top,


        ];
    }
}
