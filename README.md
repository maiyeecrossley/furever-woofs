# FurEver Woofs

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741815971/Screenshot_2025-03-12_at_20.45.57_ubhyvv.png" width="500" alt="screenshot of FurEver Woofs logo">


[Deloyed link](https://furever-woofs.netlify.app/)


## Description

FurEver Woofs is a full-stack web application designed to connect rescue dog charities with potential adopters and volunteers. Users are able to browse the available dogs that are ready to be rehomed, show interest in adopting, and contact charities directly through the platform. The app also supports charities in managing dog profiles and adoption requests.

The idea behind this application was built around my love for dogs, and my volunteering for a rescue charity, specifically for the Akita breed.

Currently, a lot of the volunteering is sought out by the smaller charity's trustees on social networking platforms, mainly on Facebook. Majority of the time, they would post a message to ask if anybody within a certain location can carry out a job on their behalf, which includes home visits, dog assessments, and help with travel.

I wanted to build an application that could help these charities find potential adopters, as well as the ability to connect and reach out to the volunteers that have the availability to carry out these tasks without needing to wait for a response from the posts.

The app focuses on building a Node.js/Express/MongoDB application with full CRUD functionality, using session-based authentication and a RESTful API, whilst using EJS templates to render views for the users.

## Time Frame

The project took one week from day of planning, using Trelloboard to feature the user stories, and Excalidraw for the wireframes, leading up to deployment date. This project was done independently by myself.

## Tech Stack

- Node.js
- Express.js
- MongoDB Compass
- Mongoose
- JavaScript
- EJS
- HTML
- CSS
- Git
- GitHub
- Postman (for testing)
- Netlify (for hosting)
- Stack Overflow


## Planning

During the planning stage, I used Trello to describe the user stories, organise my work flow, and time management so sretch goals could be reached.
[Link to my Trello board](https://trello.com/b/Z3CdoSJ2/furever-woofs)

I used Excalidraw to design the wireframes for the app's main pages to illustrate what the pages and layout would look like to the users.

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741815962/furever-woofs-wireframe_oqews1.png" width="500" alt="screenshot of wireframe for furever woofs layout"> 


Index page:

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741905887/pauhzgdoievaouvqwnqi.png" width="500" alt="screenshot displaying the index of dogs with their name and breed details">



Show page:

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741906234/Screenshot_2025-03-13_at_22.49.57_cmvpzg.png" width="500" alt="screenshot of the show page, featuring Henry the Akita">

## Build Process

I began the project by creating the GitHub repository and setting up the initial file struction for the Node.js/Express/MongoDB app. Once the application was initialised with npm, I installed the necessary dependencies, which included Express, Mongoose, EJS, and bcrypt and dotenv to handle the authentication.

When the initial setup was complete, I began configuring teh server by importing Express to manage the routes and requests, and Mongoose to handle the database interaction.
From that, I added initial data so I could seed my database, alongside the partials and nav.ejs templates.

Next, I worked on setting up the database using MongoDB and Mongoose. I created two main schemas:
- User Schema: This included fields like username, password, and role to differentiate between ‘charity’ and ‘adopter’ users. This role field became really useful later when handling form logic and access control.

- Dog Schema: I included fields for the dog’s name, breed, age, description, and image, along with a reference to the user (charity) that added the dog.

After setting up the models, I tested the database connections and basic CRUD operations using Postman to make sure the data was being saved and retrieved correctly.

With the models in place, I moved on to setting up the Express server to handle requests and responses. I structured the routes using RESTful conventions for clarity and maintainability.
The user route handled user registration, login, and profile management and the dog route handled creating, viewing, editing, and deleting dog profiles.

For authentication, I implemented session-based authentication, which meant that once a user logged in, their session would persist until they've logged out.
I also added custom middleware to differentiate between 'charity' and 'adopter' users, so only charities could add, or manage dog profiles:
``` JS
export function isCharityUser(req, res, next) {
    try {
        const user = req.session.user
        if (!user || user.user_type !== "charity") {
            const error = new Error("Only valid charity users can access this page.")
            error.name = "UnauthorisedError"
            throw error
        }
        next()
    } catch (err) {
        next(err)   
    }
}
```

For the frontend, I used EJS templates to render dynamic views. For example, when displaying a dog’s details, I used EJS to dynamically load information like the dog’s name, breed, and image. 
I used conditional rendering to show edit and delete options only for the charity that added the dog:
``` JS
<% if (user && user.user_type === "charity") { %>
           <p><a href="/dogs/update/<%= dog._id %>">Update <%= dog.name %>'s Details</a></p>
    
          <form class="delete" action="/dogs/<%= dog._id %>?_method=DELETE" method="POST">
            <button type="submit"><%= dog.name %> has found their furever sofa ❤️</button>
          </form>
    
        <% } %>
```

For example, the user test is the developer, with charity-user status, charity number of 12345.
Using Buddy the labrador retriever:

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741906594/Screenshot_2025-03-13_at_22.55.15_bulaco.png" width="400" alt="screenshot of show page for Buddy the labrador retriever">

Buddy currently has the charity number of 61890.

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741906594/Screenshot_2025-03-13_at_22.55.33_pd6kiz.png" width="400" alt="screenshot showing current charity number as 61890">

Attempt to update the charity number:

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741906594/Screenshot_2025-03-13_at_22.55.50_tylwld.png" width="400" alt="screenshot showing change in charity number to 12345">

Met with error message:

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1741906594/Screenshot_2025-03-13_at_22.55.57_zcwg7j.png" width="400" alt="error message of 'forbidden, this dog does not belong to your charity">


Throughout the build, I used Postman to test API routes and ensure that data was being sent and received correctly. This helped catch issues early, especially around form submissions and data validation.
I also manually tested the user flow by registering users (both charity and adopters), logging in, creating dog profiles, and editing them to make sure everything worked as expected.


## Challenges


#### Challenge #1
I initially considered separating "charity" and "adopter" users for ease of development, but this approach proved inefficient. Instead, I chose to differentiate the two on the registration form, so when a user clicked "I am a charity", the form would display specific fields like "charity name" and "charity number", whereas selecting "I am looking to adopt" would show fields relevant to adopters. This was achieved by adding a "user-type" field to the user schema and adding logic in the controller to handle the data based on the selected role. I used conditionals in the registration form to dynamically render the relevant fields, making the process more intuitive and ensuring users only saw information relevant to their choice.

#### Challenge #2
When building the dog breeds input form, I found it repetitive to manually write out each breed option in the EJS template. To solve this, I introduced loops to dynamically render the options.

To better structure the data for looping, I researched JavaScript objects and key-value pairs, learning how to organize the breed data in a way that made it easier to loop through and display dynamically. This approach not only made the form cleaner but also more scalable for adding new breeds in the future.

#### Challenge #3
Managing dog breed data became a complex challenge, particularly when handling the "create" and "update" forms. This part of the project involved a lot of trial and error to ensure data consistency, and prevent runtime issues.

Initially, breed data was stored as raw strings, which caused several issues:
- Case sensitivity problems: Breeds like “Labrador” or “labrador” would fail due to mismatched casing.

- Unexpected data types: Some properties weren’t stored as arrays, leading to errors when trying to apply array methods like .includes() or .forEach().

To resolve these issues, I went through a process of experimentation and iteration, applying several key changes to improve data handling:
- I converted all breed names to lowercase using .toLowerCase() to ensure consistent data storage and search functionality, regardless of how the user typed the input.

- Validated data types by using Array.isArray() to ensure breed fields were treated as arrays before applying methods like .includes() or .forEach().
- Added error handling to catch and manage missing or incorrectly formatted data, which prevented unexpected crashes and improved reliability.
- Improved the display of breed names by using string manipulation within the EJS templates. Even though breed data was stored in lowercase for consistency, I used .split(), .charAt(), and .toUpperCase() to ensure each breed displayed correctly on the form. This capitalised the first letter of each word (like “Golden Retriever”) to make the labels more readable and professional for users.
```JS
        <fieldset>
            <legend>Breed:</legend>
            <div class="checkbox-group">
            <% Object.entries(dogBreeds).forEach(([key, value]) => { %>
                <% const formattedValue = value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '); %>
                <div class="checkbox-item">
                <input type="checkbox" name="breed" id="breed_<%= key %>" value="<%= formattedValue %>"> 
                <label for="breed_<%= key %>"><%= formattedValue %></label><br>
                </div>
            <% }); %>
            </div>
        </fieldset>
```

## Wins

- The overall look of the app
- Applied RESTful routing conventions for cleaner and more maintainable backend code.
- Custom error handling for better debugging and user feedback.

## Key Learnings

- Dealing with data inconsistencies (like breed names) helped me understand the importance of data validation and consistency. It allowed me to use methods like .toLowerCase() to standardise the data and Array.isArray() to validate the inputs. This experience helped me improve my approach to handling and processing user inputs.

- Implementing session-based authentication taught me how to manage and protect user sessions securely. I learnt how to create and handle user sessions, restrict access to protected routes, and manage role-based access control (e.g., separating ‘charity’ and ‘adopter’ users).

- Managing sessions and understanding how cookies work in Express was a valuable learning experience. It taught me how to store session data securely and ensure that session-based authentication persisted across different routes.

- Designing schemas with Mongoose gave me a deeper understanding of how to structure data to enforce schema rules. I learnt how to set up model relationships, handle ObjectIds for referencing, and manage CRUD operations effectively.

- Creating custom middleware for authentication and authorization gave me a better understanding of how middleware functions work in Express.

- Using EJS to conditionally render elements based on user roles (like only showing edit/delete buttons to charity users) improved my understanding of dynamic rendering and user experience design.


## Bugs

I am not aware of any current bugs at the moment as most bugs were squished during production and testing.


## Future Improvements

- Allow volunteers to be contacts by the charity to perform certain tasks required by them, eg home checks, transport, assessments etc
- Add more breeds to the database
- Add messaging ability within the dog show page
- Allow user profiles


#### Assets Attributions:

- [Stockcake](https://stockcake.com/i/dogs-in-park_1227518_1043963)
- [Imgur - Akita](https://i.imgur.com/OHzmo9D.jpeg)
- [Imgur - Labrador Retriever](https://i.imgur.com/s3RYVh1.jpeg)
- [Imgur - Cocker Spaniel](https://i.imgur.com/WxFeqTc.jpeg)
- [Imgur - German Shepherd](https://i.imgur.com/JuOwJTW.jpeg)
- [Imgur - Border Collie](https://i.imgur.com/AXHNqpn.jpeg)
- [Imgur - Beagle](https://i.imgur.com/rY1vP68.jpeg)


#### Tools
- [Excalidraw - to draw out wire frames](https://excalidraw.com/)
- [Trello - for user story planning](https://trello.com/)
- [Google Fonts - Thasadith](https://fonts.google.com/specimen/Thasadith)
- [Google Fonts - Sour Gummy](https://fonts.google.com/specimen/Sour+Gummy)
- [Colour Picker](https://htmlcolorcodes.com/color-picker/)


