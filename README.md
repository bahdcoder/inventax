# Inventory management system in laravel

This is a simple inventory management system built with Laravel and Inertia.js. It allows users to view a list of products, filter products by category, stock status and name, and create new products.

## Summary of features

This is a summary of the features supported by this application:

- [x] A user can see a list of products available in the inventory by visiting the `/` page.
- [x] A user can filter products in inventory based on category, stock status and name.
- [x] A user can create a product by visiting the home page `/` and clicking the `Add product` button.
- [x] Application is fully responsive and provides a good user experience across devices.

## Set up

## To improve

For future improvements, these are some of the changes I would make:

- [ ] The status radio feels heavy. This is because of the dom update strategy. At the moment it highlights the selected status after inertia updates the page. We could make it auto highlight on click.
- [ ] Improve categories combobox to handle unique cases like api failure, search abort, no results, etc.
- [ ] Refactor components to reusable hooks. Example: Paginator, Combobox.
- [ ] Fix scroll behaviour on page navigation.
- [ ] Add more feature tests for the product and category controllers to ensure they keep working as expected.
