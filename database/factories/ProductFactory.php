<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'quantity' => $this->faker->numberBetween(10, 500),
            'category_id' => Category::factory(),
            'status' => $this->faker->randomElement(['IN_STOCK', 'OUT_OF_STOCK']),
        ];
    }

    public function inStock(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'IN_STOCK',
            ];
        });
    }
}
