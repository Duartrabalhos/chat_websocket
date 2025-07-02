import 'reflect-metadata';
import { createServer } from 'node:http';
import { Wss } from './socket/wss';
import { DataSource } from './database/connection';
import app from './app';
import RoomManager from './domain/RoomManager';
import dotenv from "dotenv";

const port = process.env.PORT || 3000;
dotenv.config({ path: ".env.dev" });
const server = createServer(app);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_USER:", process.env.DB_USER);
DataSource.initialize()
  .then(() => {
    console.log('Database connected');
    RoomManager.loadRooms();

    server.on('upgrade', (request, connection, head) => {
      Wss.handleUpgrade(request, connection, head, ws => {
        Wss.emit('connection', ws, request);
      });
    });

    server.listen(port, () => {
    console.log(`server running on http://0.0.0.0:${port}`);
  });
  })
  .catch(err => console.log(err)); 
