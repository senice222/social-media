import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = console;
  private users = [];

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${Object.keys(this.io.sockets.sockets).length}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client id: ${client.id} disconnected`);
    this.removeUser(client.id);
    this.io.emit('getUsers', this.users);
  }

  @SubscribeMessage('addUser')
  handleAddUser(client: any, userId: string) {
    this.addUser(userId, client.id);
    this.io.emit('getUsers', this.users);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, data: any) {
    const { senderId, receiverId, text } = data;
    const user = this.getUser(receiverId);
    this.io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
  }

  private addUser(userId: string, socketId: string) {
    const existingUser = this.users.find((user) => user.userId === userId);

    if (!existingUser) {
      this.users.push({ userId, socketId });
    }
  }

  private removeUser(socketId: string) {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }
}
