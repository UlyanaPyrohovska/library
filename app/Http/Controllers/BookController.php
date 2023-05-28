<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BookResource::collection(
            Book::all()->sortBy(
                'created_at',
                descending: false
            )
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        // Get the validated data from the request
        $data = $request->validated();




        // Create a new book instance based on the validated data
        $book = new Book;
        $relativePath = $this->save_image($data['link']);
        $book->file = $relativePath;
        $book->name = $data['name'];
        $book->year = $data['year'];
        $book->pubhouse_id = $data['pub_house'];
        $book->category_id = $data['category'];
        $book->num_of_down = 0;
        $book->num_of_views = 0;
        // Save the book
        $book->save();

        // Attach authors to the book based on the provided author IDs
        $authors = $data['authors'];
        if (!empty($authors)) {
            $book->authors()->attach($authors);
        }

        // Attach keywords to the book based on the provided keyword IDs
        $keywords = $data['keywords'];
        if (!empty($keywords)) {
            $book->keywords()->attach($keywords);
        }

        // Retrieve the newly created book with its relationships
        $book->load('authors', 'keywords', 'pubhouse', 'category');

        // Transform the book resource
        $bookResource = new BookResource($book);

        // Return the transformed book resource as the response
        return $bookResource;
    }

    private function save_image($image)
    {
        // Check if image is a valid base64 string
        if (preg_match('/^data:application\/pdf;base64,/', $image)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);

            // Decode the base64 image
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with PDF data');
        }

        $dir = 'pdfs/';
        $file = Str::random() . '.pdf';
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}