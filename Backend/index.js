import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ImageKit from 'imagekit';
import db from './db/db.js';

const app = express();
dotenv.config();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const PORT = process.env.PORT || 5000;
 
app.get('/api/upload', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post('/api/chats',  (req, res) => {
  const { text } = req.body;
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db();
});