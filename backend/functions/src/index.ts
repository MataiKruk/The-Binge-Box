import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import playlistRouter from './routes/playlistRouter';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", playlistRouter);
export const api = functions.https.onRequest(app);