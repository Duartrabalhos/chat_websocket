import 'reflect-metadata';
import { createServer } from 'node:http';
import { Wss } from './socket/wss';
import { DataSource } from './database/connection';
import app from './app';
import RoomManager from './domain/RoomManager';
import dotenv from "dotenv";


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

    server.listen(process.env.PORT, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
