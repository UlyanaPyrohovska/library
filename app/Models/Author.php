<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    use HasFactory;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = ['name', 'year_of_birth', 'address'];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'books_authors');
    }
}