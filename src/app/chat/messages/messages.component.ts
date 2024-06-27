import { Component } from '@angular/core';
import { SocketserviceService } from '../socketservice.service';
import { io } from 'socket.io-client';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Message } from './message.model';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  currentuser
  userName = '';
  message : any;
  messageList: any
  userList: any;
  userListSub:Subscription;
  messageListSub:Subscription;
  socket: any;
  constructor(private socketService : SocketserviceService,private authService : AuthService){
  
  }
  
  ngOnInit(): void {
   
    // console.log(this.userList)
    this.currentuser= this.authService.getProfile()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.currentuser.username)
    this.socketService.connnect(this.currentuser.username)
    this.socketService.userList()
    this.userListSub=this.socketService.getUserList().subscribe(users=>{
      this.userList=users[0]
    })
    this.messageListSub=this.socketService.getMessages().subscribe((messages)=>{
      this.messageList=messages[0]
      console.log('messages',this.messageList)
    })
  }



  sendMessage(){
    // console.log(this.currentuser.usernam)
    this.socketService.sendMessage(this.message,this.currentuser.username)
    this.message=''
  }


}
