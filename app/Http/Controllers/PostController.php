<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\Image;
use Cloudinary;

class PostController extends Controller
{
    public function mypage(User $user)
    {
        $myposts = Post::getDisplayPosts()->where('user_id', $user->id);
        $myposts = [...$myposts];
        return Inertia::render("Post/Mypage", ["posts" => $myposts, "user" => $user->load("categories"), "categories" => Category::all()]);
    }
    
    public function home()
    {
        return Inertia::render("Post/Home", ["posts" => [ ...Post::getDisplayPosts() ], "categories" => Category::all()]);
    }
    
    public function create()
    {
        return Inertia::render("Post/CreatePost", ["categories" => Category::all()]);
    }
    
    public function store(Request $request, Post $post)
    {
        $input = $request->all();
        $post->fill($input)->save();
        
        foreach($request->file('images') as $file) {
            $image_url = Cloudinary::upload($file->getRealPath())->getSecurePath();
            Image::create([
                'post_id' => $post->id,
                'image_url' => $image_url,
            ]); 
        }
        
        return redirect(route("home"));
    }

    public function storeLike(Request $request)
    {
        $user_id = Auth::user()->id;
        $post = Post::find($request->input('post_id'));
        $post->likedBy()->attach($user_id);
    }

    public function deleteLike(Request $request)
    {
        $user_id = Auth::user()->id;
        $post = Post::find($request->input('post_id'));
        $post->likedBy()->detach($user_id);
    }
    
    public function test()
    {
        return Inertia::render("Post/Test");
    }
}
