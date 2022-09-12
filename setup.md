# Project Setup

The project is split into frontend and backend directories. The backend server cannot run until the React app is built.

## Frontend

Change into the frontend directory first

```bash
cd frontend
```

1. Copy environment variables: `cp example.env .env`
2. Run `npm i` to install independencies
3. Run `npm run build` to build the React app (the build will be saved in the backend directory)

When developing the frontend app, you can run `npm start` to start the React app. Go to `http://localhost:3000` to see the React app.

## Backend

Change into the backend directory

```bash
cd backend
# OR this if you're already in frontend folder
cd ../backend
```

1. Copy environment variables: `cp example.env .env`
2. Run `npm i` to install dependencies
3. Run `npm start` to run the server

Go to `http:/localhost:8765` to see the full app.
