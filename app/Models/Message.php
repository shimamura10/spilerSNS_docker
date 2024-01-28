<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'oponent_id'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
    public function oponent()
    {
        return $this->belongsTo(User::class, 'oponent_id');
    }
}
