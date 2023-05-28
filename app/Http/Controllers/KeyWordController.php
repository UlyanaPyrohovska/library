<?php

namespace App\Http\Controllers;

use App\Http\Resources\KeyWordResource;
use App\Models\KeyWord;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKeyWordRequest;
use App\Http\Requests\UpdateKeyWordRequest;

class KeyWordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return KeyWordResource::collection(
            KeyWord::all()->sortBy(
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
    public function store(StoreKeyWordRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KeyWord $keyWord)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KeyWord $keyWord)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKeyWordRequest $request, KeyWord $keyWord)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KeyWord $keyWord)
    {
        //
    }
}