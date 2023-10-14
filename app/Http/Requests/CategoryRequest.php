<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|unique:categories,name',
        ];
    }

    public function messages() {
        return [
            'name.unique' => 'その作品カテゴリー名は既に存在しています'
        ];
    }
}