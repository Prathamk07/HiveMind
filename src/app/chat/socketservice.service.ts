import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {
  socket : Socket
  SOCKET_ENDPOINT='http://localhost:3000'
  constructor() { }

  connnect(){
    this.socket=io(this.SOCKET_ENDPOINT)
  }
}
