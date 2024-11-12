Simple Note-Taking Application
Overview
This application is a simple note-taking tool built using a Laravel 8 RESTful API as the backend and React.js (or Vue.js) as the frontend. Users can create, edit, delete, and view notes seamlessly.

Prerequisites
Make sure you have the following installed:

PHP 8
Composer
Node.js
npm (or yarn)
A database like MySQL or SQLite (compatible with Laravel)
Project Setup
Backend Setup (Laravel API)


Clone the repository:
https://github.com/hassan0342/notes-management-app.git

Navigate to the backend directory:
cd notes-management-app/backend-notes-app

Install PHP dependencies:
composer install


Create a copy of the .env file:
cp .env.example .env

Generate the application key:
php artisan key:generate


Run database migrations and seed the database:
php artisan migrate --seed

Start the Laravel development server:
php artisan serve

===========================================================================

Frontend Setup (React.js)
Navigate to the frontend directory:
cd notes-management-app/frontend_notes_app

Install JavaScript dependencies:
npm install


npm run dev
npm start


