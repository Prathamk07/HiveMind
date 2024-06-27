import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Message } from './messages/message.model';

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {
  socket : Socket
  userlist: string[] = [];
  userUpdated = new Subject()
  username
  SOCKET_ENDPOINT='http://localhost:3000/'
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  messageListUpdated=new Subject()
  // message
  constructor() { }

  connnect(username:string){
    console.log(username)
    this.username=username
    this.SOCKET_ENDPOINT=this.SOCKET_ENDPOINT+'?userName='+username
    this.socket=io(this.SOCKET_ENDPOINT)
  }
  userList(){
    this.socket.on('user-list', (userList: string[]) => {
      this.userlist = userList;
      this.userUpdated.next([...[this.userlist]])
      console.log('userlist : ',userList)

    });
    this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
      if (data) {
        // this.messageList.pipe(
        //   map(data=>{
            
        //   })
        // )
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
        this.messageListUpdated.next([...[this.messageList]])

      }
      console.log(this.messageList)
    });
  
    // return this.userlist
  }
  getUserList(){
    console.log(this.userlist)
    return this.userUpdated.asObservable()
  }
  getMessages(){
    return this.messageListUpdated.asObservable()
    
  }
  sendMessage(message,username){
    this.socket.emit('message', message);
    // this.socket.emit('message', this.message);
    console.log(username)
    let msg ;
    if(username === this.username){

      msg  = {
        userName : username,
        message : message,
        mine : true
      }
    }else{
      msg={
        userName : username,
        message : message,
        mine : false
      }
    }

    
    this.messageList.push(msg);
    console.log(this.messageList)
    this.messageListUpdated.next([...[this.messageList]])
    
    // this.message = '';
  }
}
