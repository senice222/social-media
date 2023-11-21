import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser, handleAddUser } from './socket.interfaces';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users = [];

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.removeUser(client.id);
    this.server.emit('getUsers', this.users);
  }

  @SubscribeMessage('addUser')
  handleAddUser(client: Socket, payload: handleAddUser): void {
    this.addUser(payload.userId, client.id);
    this.server.emit('getUsers', this.users);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload: any): void {
    const user = this.getUser(payload.receiverId);
    this.server.to(user.socketId).emit('getMessage', {
      senderId: payload.senderId,
      text: payload.text,
    });
  }

  private addUser(userId: string, socketId: string): void {
    const existingUser = this.users.find((user) => user.userId === userId);
    if (!existingUser) {
      this.users.push({ userId, socketId });
    }
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string): GetUser | undefined {
    return this.users.find((user) => user.userId === userId);
  }
}
