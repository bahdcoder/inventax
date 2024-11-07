<?php

namespace Tests\Browser;

use App\Models\Product;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\ProductsPage;
use Tests\DuskTestCase;

class ProductsTest extends DuskTestCase
{
    public function testProductsPageDisplaysCorrectly(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new ProductsPage)
                ->assert();
        });
    }

    public function testCanSearchProductsByName(): void
    {
        $name = $this->faker->sentence(4);

        Product::factory()->createOne([
            'name' => $name
        ]);

        $this->browse(function (Browser $browser) use ($name) {
            $browser->visit(new ProductsPage)
                ->searchProductByName($name)
                ->waitForText($name)
                ->assertSee($name);
        });
    }
}
