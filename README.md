# yourEditorials - The complete platform for sharing own fashion photos.

![Application intro](https://raw.githubusercontent.com/MarioLuigie/MERN_App/main/client/public/readme-intro.jpg)

## Introduction

**yourEditorials** is a platform that allows users to share photos from their fashion sessions, build portfolios, and find inspiration from other users. The application is built on the MERN stack (MongoDB, Express.js, React, Node.js) and offers a responsive user interface.

You can try it out here: **[https://yourmemories.vercel.app/](https://yourmemories.vercel.app/)**

## Technologies

**Frontend:**
- **[Vite](https://nodejs.org/en/docs/)** - Bild tool for modern web development with speedy compilation and on-the-fly module imports.
- **[React](https://nodejs.org/en/docs/)** - A powerful JavaScript library for building user interfaces, known for its declarative syntax and efficient component-based architecture.
- **[Redux](https://nodejs.org/en/docs/)** - A state management library for JavaScript applications, providing a predictable and centralized state container to simplify data flow and management in complex front-end projects.
- **[Axios](https://nodejs.org/en/docs/)** - A popular JavaScript library for making HTTP requests in web applications.
- **[MaterialUI](https://nodejs.org/en/docs/)** - A versatile React UI framework that offers a wide range of pre-designed components and styles.
- **[React Dropzone](https://nodejs.org/en/docs/)** - An intuitive and customizable React library for handling file uploads, simplifying the implementation of drag-and-drop functionality with built-in features for managing files and enhancing user experience.
- **[React Emotion](https://nodejs.org/en/docs/)** - Library for React applications, offering a flexible and efficient way to handle component styles with JavaScript.
- **[React Router Dom](https://nodejs.org/en/docs/)** - A Navigation library for React applications, enabling developers to implement dynamic and seamless routing, facilitating the creation of multi-page web applications.
- **[Moment](https://nodejs.org/en/docs/)** - A JavaScript library for parsing, validating, manipulating, and formatting dates and times, providing a convenient and efficient way to work with time-related data in web applications.
- **[JWT-decode](https://nodejs.org/en/docs/)** - A JavaScript library for decoding JSON Web Tokens (JWT), making it to extract and access the payload data without the need for complex decoding logic, commonly used for authentication in web applications.
- **[QS](https://nodejs.org/en/docs/)** - A JavaScript library for serializing and parsing query strings, offering a convenient and efficient way to handle URL query parameters in web applications.
- **[react-oauth/google](https://nodejs.org/en/docs/)** - A React library for integrating OAuth authentication with Google, streamlining the process of implementing secure and seamless user authentication using Google accounts in web applications.

**Backend:**
- **[NodeJS](https://nodejs.org/en/docs/)** - A powerful and versatile JavaScript runtime environment that enables server-side execution of JavaScript code.
- **[Express](https://nodejs.org/en/docs/)** - A framework for Node.js, simplifying the development of robust and scalable web applications by providing a set of essential features and middleware.
- **[AWS-sdk/client-s3](https://nodejs.org/en/docs/)** - A JavaScript library provided by AWS SDK for interacting with Amazon Simple Storage Service (S3), offering a comprehensive set of tools for managing and accessing scalable and secure cloud storage in web applications.
- **[bcryptjs](https://nodejs.org/en/docs/)** - A JavaScript library for hashing passwords using the bcrypt hashing algorithm, known for its security and resistance to brute-force attacks, providing a reliable solution for storing and verifying password hashes in web applications.
- **[google-auth-library](https://nodejs.org/en/docs/)** - A JavaScript library provided by Google for implementing authentication and authorization in web applications.
- **[jsonwebtoken](https://nodejs.org/en/docs/)** - A JavaScript library for creating and verifying JSON Web Tokens (JWT), providing a secure and efficient method for transmitting information between parties in web applications.
- **[multer](https://nodejs.org/en/docs/)** - A Node.js middleware for handling multipart/form-data, commonly used in web applications to handle file uploads, providing a flexible and efficient way to process and store files on the server.
- **[multer-s3](https://nodejs.org/en/docs/)** - An extension for the Multer middleware in Node.js that facilitates direct file uploads to Amazon S3, streamlining the process of storing and retrieving files on the AWS cloud storage service in web applications.
- **[sharp](https://nodejs.org/en/docs/)** - A Node.js image processing library that provides a simple and efficient interface for performing various image manipulation tasks, such as resizing, cropping, and format conversion, making it well-suited for optimizing and transforming images in web applications.

## Key Features

**Registration and Login:**
- Users can create a new account or log in using existing credentials.

**User Panel:**
- Each registered user has access to their user panel.
- Ability to manage personal information, change password, etc.

**Browsing Resources:**
- Dynamic loading of data from the MongoDB database in real-time.
- The home page presents main resources or information.

**Creating and Editing Resources:**
- Allows users to add new resources to the system.
- Editing existing resources from the user interface.

**Search:**
- Advanced search features for users to quickly find the needed information.

**Authorization and Permissions:**
- Configured authorization systems determining which resources are available to individual users.

**Responsive Design:**
- User interface adapted to different devices, providing a consistent user experience.

## Planned Extensions

**Integration with External Services:**
- Planned integration with external services such as online payments, authorization systems, etc.

**Security Enhancements:**
- Planned implementation of additional security features, such as two-factor authentication.

**Multi-Language Support:**
- Planned functionality to support multiple languages in the user interface.

## Directory Structure

- `/MERN-APP`
  - `/client` 
    - `/node_modules`          
    - `/public`- Public files served by the development server
    - `/src/`- Source files of the application
      - `/assets/`- Static files
        - `/icons/`- Icons files
        - `/images/`- Graphics files
        - `/videos/`- Videos files
      - `/components/`- Reusable UI components
        - `/auth/`- Components for authentication
        - `/content/`- General components
          - `/footer/`- Footer components
          - `/forms/`- Forms components
          - `/landingPage/`- Landing page intro components
          - `/mainMenu/`- Main menu components
          - `/navbar/`- Navbar components
          - `/postDetails/`- Post details components
          - `/posts/`- Posts components
        - `/dialogs/`- Dialogs components
        - `/layout/`- Layout-related UI components
        - `/pages/`- Pages components
        - `/ui/`- Components specific to the Shadcn library
      - `/config/`- Configuration files used in the application
      - `/constants/`- Constant values
      - `/context/`- Context files
      - `/redux/`- Redux folders
        - `/api/`- Root folder for handling API-related code
        - `/actions/`- CRUD-related actions
        - `/reducers/`- Application`s state
        - `/store/`- Application state storage
      - `/utils/`- Tools to use throughout the application
      - `/App.jsx`- General component
      - `/index.jsx`- Entry point for the client-side application
      - `/index.scss`-Global styles and styling utilities for the application
      - `/index.html`- HTML template for the client application.
  - `/api/`              
    - `/controllers/`- Controllers responsible for handling CRUD operations.
    - `/middlewares/`- Middlewares related to CRUD operations.
    - `/models/`- Data models used in the application
    - `/routes/`- Route definitions for API endpoints
    - `/index.js`- Entry point for setting up and exporting the API
    - `/package.json`- Configuration file for managing API dependencies         
  - `/node_modules/`- Folder containing npm dependencies (automatically generated)        
  - `/.gitignore`- Configuration file specifying files and folders to be ignored by Git          
  - `/package.json`- Configuration file for managing project-level dependencies and scripts  
  - `/package-lock.json`- Automatically generated file locking dependencies versions        
  - `/README.md`- Project documentation providing an overview of the project structure and instructions for developers  
  - `/vercel.json`- Configuration file for Vercel deployment.

## Setup

Follow these steps to set up the project locally.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the repository**

```bash
git clone https://github.com/MarioLuigie/MERN_App.git
cd MERN-APP
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Setup Environment Variables**

Create a new file named `.env` in the api catalog and add the following content:

```env
#GENERAL
PORT=

#MONGODB
- MONGODB_URI=

#AWS
- AWS_ACCESS_CODE=
- AWS_SECRET_ACCESS_KEY=
```

Create a new file named `.env.production` in the client catalog and add the following content:

```env
#REACT VITE
- VITE_REACT_APP_API_URL=
```

Fill in the environmental variable values with your actual credentials.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173/) in your browser to view the project.

## More
For more information please contact [mk.lotocki@gmail.com](mailto:mk.lotocki@gmail.com).


