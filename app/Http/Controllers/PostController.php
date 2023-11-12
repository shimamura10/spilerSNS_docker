<?php

namespace App\Http\Controllers;
require __DIR__ . '/../../../vendor/autoload.php';

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\Image;
use Cloudinary;
use Aws\Comprehend\ComprehendClient;

class PostController extends Controller
{
    public function analyzeSentiment(String $text): string
    {
        $client = new ComprehendClient([
            'region' => 'ap-northeast-1',
            'version' => 'latest'
        ]);

        $result = $client->detectSentiment([
            'LanguageCode' => 'ja', // REQUIRED
            'Text' => $text, // REQUIRED
        ]);
        
        $sentiment = $result->get('Sentiment');
        // dd($sentiment);
        return $sentiment;
    }

    public function mypage(User $user)
    {
        // dd(Post::getDisplayPosts());
        $myposts = Post::getDisplayPosts()->where('user_id', $user->id)->paginate(30);
        // キーを連番になおす
        // $myposts = [...$myposts];
        // dd($myposts);
        return Inertia::render("Post/Mypage", ["posts" => $myposts, "user" => $user->load("categories"), "categories" => Category::all()]);
    }
    
    public function home()
    {
        $posts = Post::getDisplayPosts()->paginate(30);
        return Inertia::render("Post/Home", ["posts" => $posts, "categories" => Category::all(), "next_url" => $posts->nextPageUrl()]);
    }
    
    public function create()
    {
        return Inertia::render("Post/CreatePost", ["categories" => Category::all()]);
    }
    
    public function store(Request $request, Post $post)
    {
        $input = $request->all();
        $post->fill($input);
        $sentiment = $this->analyzeSentiment($input['body']);
        $post->sentiment = $sentiment;
        $post->save();
        
        if ($request->file('images')) {
            foreach($request->file('images') as $file) {
                $image_url = Cloudinary::upload($file->getRealPath())->getSecurePath();
                Image::create([
                    'post_id' => $post->id,
                    'image_url' => $image_url,
                ]);
            }
        }
        
        return redirect(route("home"));
        // return redirect(route("category.create"));
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
