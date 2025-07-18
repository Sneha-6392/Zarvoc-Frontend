import http from 'http';
import dotenv from 'dotenv';
import app from './app.js'; // Importing the app from app.js

dotenv.config();


const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

