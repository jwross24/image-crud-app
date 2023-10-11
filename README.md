# Image CRUD App

This is a simple CRUD (Create, Read, Update, Delete) application for images. The frontend is built with React and TypeScript, styled with shadcn/ui and Tailwind CSS, and the backend is a Node.js server.

## Features

- Upload images
- List all uploaded images
- Search for images by name
- Delete images

## Approximate Time for Completion

- Backend: 55 minutes
- Frontend: 1 hour, 35 minutes
- Total: 2 hours, 30 minutes

## What's Missing / Future Work

- Add pagination for image list
- Add batch image upload
- Add unit and integration tests
- Add better error handling and feedback to the user (loading, etc.)
- Add documentation for the backend endpoints
- Store images in a file store, rather than locally on the server
- Improve UI styling
- Implement user authentication (although it wasn't required for this exercise)

## How to Run the Project

1. Install dependencies from the base directory.

   ```bash
   npm install
   ```

### Backend

1. Navigate to the backend directory.

   ```bash
   cd backend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Run the server.

   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory.

   ```bash
   cd frontend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env.local` file containing the following:

  ```
  VITE_SERVER_PORT=4000
  ```

4. Run the React app.

   ```bash
   npm run build && npm run preview
   ```

Your frontend app should now be running at `http://localhost:5173/`, or another port if that's in use, and your backend should be running at `http://localhost:4000/`.
