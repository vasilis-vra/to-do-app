# To-Do List App
To-Do List Web application in React/Next.js.   

## Table of Contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [How to use](#how-to-use)

## General info
This project is a web application implementing a to-do list app. The app is built in React using Next.js, a JavaScript framework that lets you build server-side rendering web applications. The application also uses a MongoDb database for data storage and user authentication.

## Technologies
* React 17.0.2
* Next.js 11.0.0
* Node 14.16
* Next-auth 3.27
* MongoDb
* MongoDb Atlas
* Bootstrap 5
* Bootstrap Icons
* Google oAuth

## Setup
1. Clone the project from this repository or run ```git clone https://github.com/vasilis-vra/to-do-app.git```.
2. Navigate to the project directory and run ```npm install``` to download the necessary node modules.
3. Rename the env.local.example file to env.local and configure your database and oAuth settings. The authentication provider must provide the user email address as a scope for the authentication process to to comply with the database user authentication.
4. Run ```npm run dev``` to start the Next.js application on localhost:3000.

## How to use
1. Press the "Log in" button in the navigation bar or the "Get Started" to log in the application. The preferred method is with google oAuth as this was the method the app was tested with.
2. At first log in the app will set up a starter database document with example items, and then redirect the user to the home page.
3. The user can navigate through the basic task categories (Today, Inbox, Future) but also create Project categories in the "Projects" tab. 
4. The functionality consists of creating/deleting/moving tasks inside the basic list categories, creating/deleting projects, creating/deleting tasks inside each seperate project.



