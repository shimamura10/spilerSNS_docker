<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category_user')->insert([
            'category_id' => 1,
            'user_id' => 1,
        ]);
        DB::table('category_user')->insert([
            'category_id' => 2,
            'user_id' => 1,
        ]);
        DB::table('category_user')->insert([
            'category_id' => 3,
            'user_id' => 1,
        ]);
    }
}
