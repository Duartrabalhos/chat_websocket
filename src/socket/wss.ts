import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { WebSocketServer } from 'ws';
import RoomManager from '../domain/RoomManager';
import { fileURLToPath } from 'node:url';

interface IWebSocketMessage {
  requestType: string;
  roomId: string;
  userName: string;
  data?: any;
}

const Wss = new WebSocketServer({ noServer: true });

Wss.on('connection', ws => {
  console.log('new websocket connection!');

  const worker = new Worker(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'ws.worker.js')
  );

  ws.on('message', (message) => {
    let parseMessage: IWebSocketMessage;

    try {
      parseMessage = JSON.parse(message.toString());
    } catch (error) {
      console.error('Invalid JSON received:', message.toString());
      ws.send(
        JSON.stringify({
          type: 'error',
          message: 'Invalid JSON format'
        })
      );
      return;
    }

    worker.postMessage(parseMessage);
  });


  worker.on('message', msg => {
    if (msg.action === 'enter_room') {
      RoomManager.addClient(msg.roomId, ws);
    }

    if (msg.action === 'leave_room') {
      RoomManager.removeClient(msg.roomId, ws);
      ws.close();
      worker.terminate();
    }

    if (msg.action === 'broadcast') {
      const users = RoomManager.getRoomUsers(msg.roomId);
      for (const user of users) {
        if (user !== ws && user.readyState === user.OPEN) {
          user.send(
            JSON.stringify({
              type: 'message',
              userName: msg.userName,
              content: msg.content
            })
          );
        }
      }
    }
  });
});

export { Wss };
