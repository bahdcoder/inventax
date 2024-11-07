# Inventory management system in laravel

This is a simple inventory management system built with Laravel and Inertia.js. It allows users to view a list of products, filter products by category, stock status and name, and create new products.

## Summary of features

This is a summary of the features supported by this application:

- [x] A user can see a list of products available in the inventory by visiting the `/` page.
- [x] A user can filter products in inventory based on category, stock status and name.
- [x] A user can create a product by visiting the home page `/` and clicking the `Add product` button.
- [x] Application is fully responsive and provides a good user experience across devices.

## Set up

The setup of this project follows the standard Laravel setup with nothing out of the ordinary after you install dependencies.

1. Install dependencies using `composer install` and `npm install`
2. Build client side bundle using `npm run build`
3. Copy the `.env.example` file to `.env` and update the database configuration. By default it ships with Sqlite for simplicity.
4. Run the migrations and seed the database using `php artisan migrate --seed`. This will generate enough (a lot of) data to easily test the features of this application.

It may be easiest to set up an sqlite database by just creating a `database/database.sqlite` file and running the migrations.

```bash
php artisan migrate:fresh
```

You may also want to run the automated tests:

```bash
php artisan dusk
```

## To improve

For future improvements, these are some of the changes I would make:

- [ ] The status radio feels heavy. This is because of the dom update strategy. At the moment it highlights the selected status after inertia updates the page. We could make it auto highlight on click.
- [ ] Improve categories combobox to handle unique cases like api failure, search abort, no results, etc.
- [ ] Refactor components to reusable hooks. Example: Paginator, Combobox.
- [ ] Fix scroll behaviour on page navigation.
- [ ] Add more feature tests for the product and category controllers to ensure they keep working as expected.
