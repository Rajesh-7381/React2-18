# React2-18

# React-18
create a new project in react ->npx create-react-app foldername
    create new file->echo. > file name
    create new folder->mkdir folder name
    open vs code using cmd -> code .

to install bottstarp in react -> npm i bootstrap
    add in index.js ->
    import "bootstrap/dist/css/bootstrap.css";
    import "bootstrap/dist/js/bootstrap.bundle";


install bootstarp icons ->npm install bootstrap-icons
    add in index.js-> import "bootstrap-icons/font/bootstrap-icons.css"


<!-- using form validation and data validation -->
    ->npm i formik->form validtion
    ->npm i yup->for data validation

<!-- for notification     -->
    ->npm i react-notifications
    ->add in app.js  (import 'react-notifications/lib/notifications.css';)

<!-- for navigating purpose to install -->
    ->npm i react-router-dom

    <!-- dynamic title shown -->
   -> npm install react-helmet
   ->import React, { useEffect } from "react";
   ->useEffect(() => {
    // Set document title when the component mounts
    document.title = "Register";
  }, []);
  <!-- how it works -->
    ->When the component mounts, the useEffect hook runs the function to update the document title.
    ->At the same time, the Helmet component renders the <title> tag with the specified title.
    ->React Helmet then manages updating the document head with the content of the <Helmet> component.
    ->This approach ensures that the document title is dynamically updated based on the component being rendered,       -
    >providing a seamless user experience.

    ->use of react useffct hook ::In React, useEffect is a hook that can be used to run side effects or manage state changes after a component has rendered


    <!-- React csv functionality -->
    ->npm i react-csv (after installing react-csv functionality shown)


<!--create a backend  -->
        ->create a backend folder
        ->inside package.json to write("start":"nodemon server.js")
        ->inside backend to run comand(npm init -y)->to install package.json
        ->inside backend to run command(npm i mysql express nodemon cors)
        ->if mysql not worked to expicitly instal(npm install mysql2)
        ->npm install nodemailer
        ->npm install cookie-parser jsonwebtoken (and some changes in frontend login.jsx and server.js('/login'))
        ->npm install passport (for authentication)
        ->npm install passport-google-oauth20(google auth)
        ->npm install express-session
        ->npm install bcrypt(for password bcrypt purpose)
            