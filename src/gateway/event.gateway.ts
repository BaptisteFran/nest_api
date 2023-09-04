import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '../discutions/model/message.model';
import { User } from '../user/user.model';
import { Discution } from '../discutions/model/discution.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // Abonnement à message
  @SubscribeMessage('message')
  async onMessage(
    @MessageBody()
    data: {
      message: string;
      from: number;
      to: number;
    },
    @ConnectedSocket() client: Socket,
  ) {
    // Voir si from et to existent
    await User.findOneOrFail({
      where: {
        id: data.to,
      },
    });
    // on regarde si l'envoyer du message existe
    await User.findOneOrFail({
      where: {
        id: data.from,
      },
    });

    // Recherche discussion entre from et to
    let discution = await Discution.findOne({
      where: [
        {
          chatter1: data.from,
          chatter2: data.to,
        },
        {
          chatter2: data.from,
          chatter1: data.to,
        },
      ],
    });

    // si l'utilisateur a qui on envoi le message existe
    if (!discution) {
      discution = new Discution();
      discution.chatter1 = data.from;
      discution.chatter2 = data.to;
      discution = await discution.save(); // on enregistre la discution
    }
    const message = new Message(); // on créé un nouveau message et on le complète avec les données
    message.content = data.message;
    message.creator = data.from;
    message.to = data.to;
    message.discution = discution;
    await message.save(); // on enregistre le message

    client.emit('new-message-' + data.to, {
      message,
    }); // on envoi le message à la personne concernée

    // // Ajout d'un message à la discution

    // // Envoyer le message à to
  }
}
