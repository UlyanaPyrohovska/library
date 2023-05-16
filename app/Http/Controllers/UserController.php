<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{

    public function index(Request $request)
    {
        return UsersResource::collection(
            User::all()
                ->sortBy(
                    'created_at',
                    descending: false
                )
        );
    }


}