<?php

namespace Database\Seeders;  // This is the correct namespace

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotesSeeder extends Seeder
{
    public function run()
    {
        DB::table('notes')->insert([
            [
                'title' => 'First Note',
                'content' => 'This is the content of the first note.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Second Note',
                'content' => 'This is the content of the second note.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Third Note',
                'content' => 'This is the content of the third note.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
