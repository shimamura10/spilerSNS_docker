<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'category_id',
        'body',
        'sentiment'
    ];
    
    protected $with = ['category', 'author', 'images'];

    public static function getDisplayPosts($limit_count=3) {
        $displayCategories = [];
        foreach (Auth::user()->categories()->wherePivot('display', true)->get() as $key => $category) {
            $displayCategories[] = $category->id;
        }
        $result = Post::with(['comments.author', 'likedBy'])->orderBy('created_at', 'desc')->whereIn('category_id', $displayCategories);
        if (Auth::user()->no_negative) {
            $result = $result->where('sentiment', '!=', 'NEGATIVE');
            // dd($result);
        }
        return $result;
        // dd($result);
        // return Post::with(['comments.author', 'likedBy'])->orderBy('created_at', 'desc')->paginate($limit_count)->whereIn('category.id', $displayCategories);
        // return Post::with(['comments.author', 'likedBy'])->orderBy('created_at', 'desc')->get()->whereIn('category.id', $displayCategories);
        // return Post::with(['comments.author', 'likedBy'])->orderBy('created_at', 'desc')->whereIn('category_id', $displayCategories)->get();
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function likedBy()
    {
        return $this->belongsToMany(User::class, 'post_likes', 'post_id', 'user_id');
    }
}
