import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
  transports: ['websocket']
})
export class EventsGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log('Connected');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  ping(@MessageBody() data: string,@ConnectedSocket() socket: Socket): string {
    data = 'pong';
    return data;
  }
}
