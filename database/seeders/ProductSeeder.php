<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory(50)->create()->each(function ($category) {
            Product::factory(250)->create([
                'category_id' => $category->id,
            ]);
        });
    }
}
