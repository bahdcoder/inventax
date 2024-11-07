<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class CreateProductPage extends Page
{
    /**
     * Get the URL for the page.
     */
    public function url(): string
    {
        return '/products/create';
    }

    /**
     * Assert that the browser is on the page.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertPathIs(
            $this->url()
        )->waitForText('Create Product')->assertSee('Create Product');
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array<string, string>
     */
    public function elements(): array
    {
        return [
            '@name' => 'input[name="name"]',
        ];
    }
}
