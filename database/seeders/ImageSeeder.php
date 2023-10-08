<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert([
            'post_id' => '1',
            'image_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694635258/cld-sample.jpg',
        ]);
        DB::table('images')->insert([
            'post_id' => '1',
            'image_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694635259/cld-sample-2.jpg',
        ]);
        DB::table('images')->insert([
            'post_id' => '1',
            'image_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694635259/cld-sample-3.jpg',
        ]);
        DB::table('images')->insert([
            'post_id' => '1',
            'image_url' => 'https://res.cloudinary.com/dkodlna7g/image/upload/v1694635260/cld-sample-4.jpg',
        ]);
    }
}
