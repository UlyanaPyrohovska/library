<?php

namespace App\Http\Controllers;

use App\Http\Resources\PubHouseResource;
use App\Models\PubHouse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePubHouseRequest;
use App\Http\Requests\UpdatePubHouseRequest;

class PubHouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PubHouseResource::collection(
            PubHouse::all()
                ->sortBy(
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
    public function store(StorePubHouseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PubHouse $pubHouse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PubHouse $pubHouse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePubHouseRequest $request, PubHouse $pubHouse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PubHouse $pubHouse)
    {
        //
    }
}