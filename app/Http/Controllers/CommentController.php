<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Comment;

class CommentController extends Controller
{
    public function create(Request $request, Comment $comment)
    {
        $comment->fill($request->all())->save();
        
        // return redirect(route("home"));
    }
}
