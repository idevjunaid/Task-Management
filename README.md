# Task Management App

This is a Task Management application built with the MERN stack (MongoDB, Express, React, and Node.js). It allows users to manage tasks, set priorities, and track task statuses.

## Features

- **User Authentication**: Register and log in to your account.
- **Task Management**: Create, edit, and delete tasks.
- **Priority Setting**: Set priority levels for tasks.
- **Status Tracking**: Track the status of each task.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux Toolkit
- **Authentication**: JSON Web Tokens (JWT)
  
## Installation

1. Clone the repository:

   git clone git@github.com:idevjunaid/Task-Management.git
   cd Task-Management
   
    ## For client
      cd client
      npm install

    # For server
      cd ../server
      npm install
   # In the server folder, create a .env file with the following variables
   - MONGODB_URI=your_mongodb_connection_string
   - JWT_SECRET=your_jwt_secret
   - PORT=5000
  ## Usage
    cd server
    npm start
  # In a new terminal, start the frontend
    cd client
    npm start
    
# Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.


