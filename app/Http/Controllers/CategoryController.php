<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Category;

class CategoryController extends Controller
{
    public function followCategory(Request $request, Category $category)
    {
        // dd($request->all());
        $user_id = Auth::user()->id;
        $category = Category::find($request->input('category_id'));
        $category->users()->attach($user_id);
        
        return redirect(route("mypage", ["user" => $user_id]));
    }
}
