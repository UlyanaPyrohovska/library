<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'name' => $this->name,
            'year' => $this->year,
            'num_of_down' => $this->num_of_down,
            'num_of_views' => $this->num_of_views,
            'authors' => AuthorResource::collection($this->authors),
            'keywords' => KeyWordResource::collection($this->keywords),
            'pubHouse' => new PubHouseResource($this->pubhouse),
            'category' => new CategoryResource($this->category),
        ];
    }
}