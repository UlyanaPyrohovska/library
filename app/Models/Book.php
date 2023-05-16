<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'year', 'isbn', 'num_of_pages', 'num_of_down', 'num_of_views', 'category_id', 'author_id', 'pubhouse_id'];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function pubHouse()
    {
        return $this->belongsTo(PubHouse::class);
    }
}