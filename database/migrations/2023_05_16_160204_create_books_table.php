<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('year');
            $table->string('isbn');
            $table->integer('num_of_pages');
            $table->integer('num_of_down');
            $table->integer('num_of_views');
            $table->foreignIdFor(\App\Models\Category::class, 'category_id');
            $table->foreignIdFor(\App\Models\Author::class, 'author_id');
            $table->foreignIdFor(\App\Models\PubHouse::class, 'pubhouse_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};