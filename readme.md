## Notes App
This is a notes app that lets you view a list of notes, edit a note, and delete a note. All notes are available via a direct URL (i.e. `http://localhost:8000/1`) so they can be shared, and they're persisted through a sqlite database. In addition to the frontend built in React, there is a backend API written in the Laravel PHP framework. The following API endpoints are available:

- `GET /notes`: Fetch all notes, ordered by most recently updated.
- `GET /note/:id`: Get a specific note by ID.
- `POST /note`:  Create a note. Requires a `title` and `content` field.
- `PUT /note/:id`: Update an existing note.
- `DELETE /note/:id`: Delete an existing note.

## Pre-requisites
This notes app uses the Laravel PHP framework for the backend API and React for the frontend. You will need the composer package manager, npm, git, PHP version 7.1.3 or newer and sqlite3 installed on your machine to run this project.

## How to Run
To run the notes app, first install all of the application's dependencies with the following command:

`composer install && npm install`

*Note:* You may need to update the above command if your composer or npm command paths are different.

Next, you will need to configure the app. The below command will copy the sample environment variables file, create an empty sqlite database, create the necessary database table, and generate an ecryption key for Laravel:

`cp .env.example .env && touch database/database.sqlite && php artisan migrate && php artisan key:generate`

The app is now ready to run! You can use the built in PHP server to run the app using the following command:

`php artisan serve`
