<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class ProductsPage extends Page
{
  /**
   * Get the URL for the page.
   */
  public function url(): string
  {
    return '/';
  }

  /**
   * Assert that the browser is on the page.
   */
  public function assert(Browser $browser): void
  {
    $browser->assertPathIs($this->url())
      ->waitForText('Products')
      ->assertSee('Products');
  }

  public function searchProductByName(Browser $browser, string $name): void
  {
    $browser->type('@search-name', $name)
      ->pause(800);
  }

  /**
   * Get the element shortcuts for the page.
   *
   * @return array<string, string>
   */
  public function elements(): array
  {
    return [
      '@search-name' => 'input[name="searchName"]',
    ];
  }
}
