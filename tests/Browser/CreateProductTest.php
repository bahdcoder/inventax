<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\Browser\Pages\CreateProductPage;
use Tests\DuskTestCase;

class CreateProductTest extends DuskTestCase
{

    public function testCreateProductPageDisplaysCorrectly(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new CreateProductPage)
                ->assert();
        });
    }
}
