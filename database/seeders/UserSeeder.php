<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use DateTime;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('users')->insert([
            'name' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('password'),
            'icon_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694640480/fcqc3jvo4gsvv63rl3pj.jpg',
            'message' => 'よろしく！！',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
            ]);
        DB::table('users')->insert([
            'name' => 'user2',
            'email' => 'user2@gmail.com',
            'password' => Hash::make('password'),
            'icon_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694640516/pr65mrfkmjcwewv1zbrx.jpg',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
            ]);
        DB::table('users')->insert([
            'name' => 'user3',
            'email' => 'user3@gmail.com',
            'password' => Hash::make('password'),
            'icon_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694640520/dqnskuc4w481ehicx4ox.jpg',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
            ]);
    }
}
