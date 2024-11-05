<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://app.roamr.org/Roamr_word_logo.png" width="400" alt="Laravel Logo"></a></p>

## Requirements

This application is based on [Laravel](https://laravel.com/), [Jetstream](https://jetstream.laravel.com/introduction.html) and [React](https://react.dev/)

- PHP 8.1
- NodeJS v20.*
- NPM 10.*
- Docker

## Running application

The following commands assume PHP, composer and npm are available in PATH.

- `cp example.env .env`
  - Create an environment file from the example
- `composer install`
  - This will install the PHP dependencies
- `npm install`
  - Install the frontend dependencies
- `./vendor/bin/sail build`
  - This will setup the docker environment using [Laravel Sail](https://laravel.com/docs/11.x/sail)
- `./vendor/bin/sail up -d`
  - Startup the containers
- `./vendor/bin/sail key:generate`
  - Setup laravel encryption key in .env file
- `./vendor/bin/sail artisan migrate`
  - Setup database tables
- `./vendor/bin/sail artisan db:seed`
  - Seed database with data
- `npm run dev`
  - Build the frontend
- You should now have access to the site on http://localhost/