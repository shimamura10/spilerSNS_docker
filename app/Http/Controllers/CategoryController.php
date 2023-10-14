<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Category;
use App\Models\User;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    public function followCategory(Request $request, Category $category)
    {
        $user_id = Auth::user()->id;
        $category = Category::find($request->input('category_id'));
        $category->users()->attach($user_id);
        
        return redirect(route("mypage", ["user" => $user_id]));
    }

    public function create(Category $category, User $user) {
        return Inertia::render("Post/CategoryCreate", ["categories" => $category->get(), "user" => $user->load("categories")]);
    }

    public function store(CategoryRequest $request, Category $category) {
        // dd($request->all());
        $category->fill($request->all())->save();
        return redirect(route("home"));
    }
}
