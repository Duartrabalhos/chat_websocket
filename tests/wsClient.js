import { WebSocket } from 'ws';

const ws = new WebSocket('ws://davizeira.eduardodev.com.br/');

const messages = [ 
  'Olá servidor',
  'Como estás',
  'teste de mensagem para o servidor',
  'Que tédio'
];

ws.on('open', () => {
  console.log('🔌 Conectado ao servidor');

  // userId is a jwt
  ws.send(
    JSON.stringify({
      requestType: 'enter_room',
      roomId: '06a03cf6-5939-44c2-95e1-11d5350db7ff'
    })
  );

  const interval = setInterval(() =>
      ws.send(
        JSON.stringify({ 
          requestType: 'message', 
          userName: 'Lucas',
          roomId: '06a03cf6-5939-44c2-95e1-11d5350db7ff',
          data: messages[Math.round(Math.random() * 3)] })
      ),
    2000
  );

  setTimeout(() => {
    clearInterval(interval);
    ws.send(JSON.stringify({
      requestType: 'leave_room',
      roomId: '06a03cf6-5939-44c2-95e1-11d5350db7ff'
    }))
    // ws.close();
  }, 20000)
});

ws.on('message', data => {
  console.log('📬 Resposta do servidor:', data.toString());
});
