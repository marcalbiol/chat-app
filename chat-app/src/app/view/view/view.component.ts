import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Socket} from 'ngx-socket-io';


interface Chat {
  id: number;
  name: string;
  messages: string[];
  unread: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {

  @ViewChild('messages') messagesView!: ElementRef;
  chats: Chat[] = [
    {id: 1, name: 'Chat 1', messages: [], unread: 0},
    {id: 2, name: 'Chat 2', messages: [], unread: 0},
    {id: 3, name: 'Chat 3', messages: [], unread: 0},
  ];
  selectedChat?: Chat;
  @Output() usernameChanged = new EventEmitter<string | null>();
  public username?: string | any;

  constructor(public socket: Socket) {
  }

  ngOnInit(): void {
    this.createUser();
  }

  createUser() {
    const username = prompt('Introduce tu nombre de usuario');
    if (username) {
      this.username = username;
      this.socket.emit('username', this.username);
    }else{
      this.socket.emit('nadie');
      //FIXME
      this.createUser()
    }
  }

  //TODO cambiar nombre de usuario
  changeUserName() {
    this.usernameChanged.subscribe((username: string) => {
      this.socket.emit('username', username);
    });

    this.usernameChanged.emit(this.username);
  }

  //TODO crear nueva sala
  createNewChat(){

  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    chat.unread = 0;
  }

  sendMessage(message: string) {
    if (this.selectedChat) {
      this.socket.emit('mensaje', message, this.username, this.selectedChat.id);
      this.selectedChat.messages.push(`${this.username} : ${message}`);
    }
  }


}
