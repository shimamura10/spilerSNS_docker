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
    public function mypage(User $user, Category $category)
    {
        $myposts = $user->posts->load('comments.author');
        return Inertia::render("Post/Mypage", ["posts" => $myposts, "user" => $user->load("categories"), "categories" => $category->get()]);
    }
    
    public function home(Post $post, Category $category)
    {
        // dd($post->get()->load('comments.author'));
        return Inertia::render("Post/Home", ["posts" => $post->orderBy('created_at', 'desc')->get()->load('comments.author'), "categories" => $category->get()]);
    }
    
    public function create(Category $category)
    {
        return Inertia::render("Post/CreatePost", ["categories" => $category->get()]);
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
    
    public function test()
    {
        return Inertia::render("Post/Test");
    }
}
