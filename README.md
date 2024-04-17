![Recstart Logo](public/images/dark-logo.png)

# Recstart

Recstart is laravel starterkit project to make your work easier when starting a new project.

## Technology Used
1. [Laravel](https://laravel.com) - Main Framework
2. [ReactJS](https://react.dev/) - Front End Library
3. [shadcn/ui](https://ui.shadcn.com/) - Component Library
4. [Tailwind CSS](https://tailwindcss.com/) - Styling Utility
5. [InertiaJS](https://inertiajs.com/) - Back End to Front End Connector

## Installation

Clone this repository with this syntax

```bash
git clone https://github.com/adheramaf7/recstart.git
```

Download PHP Packages

```bash
composer install
```
Duplicate **.env.example** and rename it to **.env** or you can just run this syntax to do it

```bash
cp .env.example
```
Fill **APP_KEY** value in **.env ** file with this syntax

```bash
php artisan key:generate
```
Run migration and seeder to create database table and seed application starting data with this syntax. Make sure you have setting up database connection in **.env** file before running it.

```bash
php artisan migrate:fresh --seed
```

Download Node Modules

```bash
npm install
```

Build the frontend assets script using this syntax

```bash
npm run build
```

**OR**
just run this syntax if you want to run it in development mode.

```bash
npm run dev
```

### Demo Account
```
Email: superadmin@mail.com
Password: superadmin
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
