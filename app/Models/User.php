<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'icon_url',
        'message',
        'no_negative',
    ];

    protected $with = ['categories'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function comments()
    {
        return $this->hasMany(Post::class);
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class)->withPivot('display');
    }
    public function likePosts()
    {
        return $this->belongsToMany(Post::class, 'post_like', 'user_id', 'post_id');
    }
    public function likeComments()
    {
        return $this->belongsToMany(Comment::class, 'comment_like', 'user_id', 'comment_id');
    }
    public function messages()
    {
        return $this->belongsTo(Message::class, 'author_id');
    }
}
