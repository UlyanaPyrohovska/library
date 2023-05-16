<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = ['name', 'year_of_birth', 'address'];


}