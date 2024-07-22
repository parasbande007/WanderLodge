# WanderLodge

## Overview
WanderLodge is a full-stack web application designed to provide a seamless platform where users can list their homes and hotels for stay, while others can book these properties and leave reviews.

## Features
- **User-Friendly Listings:** Property owners can create and manage listings for their homes and hotels, complete with detailed descriptions and images.
- **Booking and Reviews:** Travelers can browse available properties, book their stay, and leave reviews.
- **Authentication:** Secure user authentication for login and signup using Passport.js.
- **Image Management:** Efficient image storage and delivery using Cloudinary.
- **File Uploads:** Handle image uploads seamlessly with Multer.

## Technologies Used
### Frontend
- **HTML**
- **CSS**
- **JavaScript**
- **Bootstrap**
- **EJS (Embedded JavaScript)** for creating dynamic templates

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**

### Additional Tools
- **Passport.js** for authentication
- **Cloudinary** for image storage
- **Multer** for handling file uploads

## Architecture
The application follows the MVC (Model-View-Controller) architecture:

- **Model:** Manages data and business logic, interacting with MongoDB for data operations.
  - **Schemas:** 
    - **Hotel Listings:** Stores information about each listed property, including details and images.
    - **Reviews:** Manages user reviews for properties, including ratings and comments.
    - **Users:** Handles user information, including authentication details.
- **View:** The presentation layer rendered using EJS, HTML, CSS, and JavaScript, ensuring a dynamic and responsive user interface.
- **Controller:** Handles user inputs, processes requests, updates the model, and determines which view to render. Express.js is used to manage these interactions.

## Setup and Installation
1.**Clone the repository:**
   ```bash
   git clone https:https://github.com/parasbande007/WanderLodge.git
   ```
2.**Install dependencies:**
  ```bash
  npm install
```
3.**Set up environment variables**
4.**Run the application:**
   ```bash
     npm start
```
5.**Visit the application:**
   Open your browser and navigate to http://localhost:8080
   

