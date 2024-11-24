# Role-Based Access Control (RBAC) Admin Dashboard
# Project Overview

This project is a Role-Based Access Control (RBAC) UI built with ReactJS. The dashboard enables both Admin and User roles, allowing admins to manage users, roles, and permissions, while users can only view their data. The application includes user authentication, role-based route access, CRUD operations for user management, and a responsive UI built using TailwindCSS.

## Key Features:
### Admin Functionality: Admin users can view a list of all users, add new users, edit existing users, and delete users both on the UI and backend.
### User Functionality: Regular users can view their data, search, and paginate through the list of users.
### Authentication: User login with JWT-based authentication and role management (admin/user).
### Responsive UI: Fully responsive layout using TailwindCSS.
### Backend: JSON-based API mock server using json-server to simulate user data and CRUD operations.
### SweetAlert: For alerts and confirmations when performing actions like adding, editing, or deleting users.

# Tech Stack
## Frontend
### ReactJS
### Redux (for state management)
### TailwindCSS (for styling)
### React Router (for routing)
### SweetAlert (for UI alerts)
## Backend
### json-server (to simulate a RESTful API with CRUD operations)

# Installation Instructions
## Clone the Repository
To get started, first, clone the repository:

git clone https://github.com/your-username/rbac-dashboard.git
cd rbac-dashboard

## Install Dependencies
Run the following command to install all required dependencies for both frontend and backend:
npm install

## Frontend Setup
### Step 1: Start the React Application
Once the backend server is running, navigate to the project folder and start the React application:
npm start
This will start the React app on http://localhost:3000. Your app will now be able to interact with the mock backend running on http://localhost:8080.

## Usage
### Once the app is up and running, open your browser and navigate to http://localhost:3000.
Admin Access
Admin users can access the Admin Dashboard by logging in with their admin credentials.
Admins have full access to the user management functionalities, including adding, editing, and deleting users.
Admins can navigate to the Admin Dashboard from the main UI by clicking on the Admin button.

# User Access
Regular users can only view their data and are unable to access the admin functionalities.
Users can search through the list of users, view their details, and paginate through the user list.

# Features
# Authentication
There are two roles: Admin and User. The Admin can manage the entire user base, while the User can only view their own data.

# Admin Dashboard
The Admin Dashboard includes:
A User List with options to:
Add a new user
Edit an existing user
Delete a user (both on the frontend and the backend)
Pagination and search functionality to easily find users
User Management Form for adding new users or editing existing ones.

# User Dashboard
The User Dashboard includes:
A list of users (with search and pagination).
View Only: Users can only see their own data and cannot edit or delete other users.

# CRUD Operations
Admins can add new users via a form.
Admins can edit existing users directly from the UI.
Admins can delete users, with data being removed both from the UI and the backend (via json-server).

# SweetAlert
SweetAlert is used to confirm user actions (like deleting users) and provide feedback (success or error messages).

## Backend Setup (json-server)
This project uses json-server to simulate a backend API. The backend is used to store user data and handle CRUD operations.

### Step 1: Create a data.json File
This file simulates a database for users, roles, and authentication tokens. Create the data.json file in the root directory of your project with the following data:

## Step 2: Start the Backend Server
### To run json-server on port 8080, execute the following command in your terminal:
json-server --watch data.json --port 8080

# Screenshots
### Login page
![login page](https://github.com/user-attachments/assets/4189942d-caed-4911-85d7-2e29e65e9c40)

### Signup page
![create page](https://github.com/user-attachments/assets/c1b08f53-ab5e-40fd-ba0e-b0696063378d)

### Home Page
![home page](https://github.com/user-attachments/assets/5372f102-22de-4c96-aca8-6abaeae79e48)

### Search 
![search](https://github.com/user-attachments/assets/8fcd25d8-ec69-4457-9693-c79ef260911a)

### Form
![form](https://github.com/user-attachments/assets/114647f1-62b7-4fc9-86fd-cd6c942fb4fc)

### Alert
![sweetalert](https://github.com/user-attachments/assets/629e0c37-7fd1-49e1-9a19-cd95360fe500)

### List Page
![list](https://github.com/user-attachments/assets/86bfc183-9b51-4e62-879c-3cafa7349b5e)

### Delete Popup
![delete](https://github.com/user-attachments/assets/919aa2c0-dc5c-4836-a6c2-726ae6f4487a)

### Edit Popup
![edit](https://github.com/user-attachments/assets/66409ea0-bedf-4279-93b6-f867cf7e0099)

# Conclusion
This Role-Based Access Control (RBAC) Admin Dashboard is a simple yet effective demonstration of user and role management in a web application. With features like authentication, user CRUD operations, and a responsive UI, this project provides a solid foundation for building scalable and secure admin dashboards.
