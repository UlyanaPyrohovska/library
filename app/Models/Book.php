<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'year', 'num_of_down', 'num_of_views', 'category_id', 'pubhouse_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function pubHouse()
    {
        return $this->belongsTo(PubHouse::class);
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'book_authors');
    }

    public function keywords(): BelongsToMany
    {
        return $this->belongsToMany(KeyWord::class, 'books_keywords');
    }
}