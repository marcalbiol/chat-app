import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Event} from "@angular/router";


interface Chat {
  id: number;
  name: string;
  messages: string[];
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {

  @ViewChild('messages') messagesView!: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | any;
  chats: Chat[] = [
    {id: 1, name: 'Chat 1', messages: []},
    {id: 2, name: 'Chat 2', messages: []},
    {id: 3, name: 'Chat 3', messages: []},
  ];
  selectedChat?: Chat;
  // @Output() usernameChanged = new EventEmitter<string | null>();
  @Output() public username?: string | any;

  public getCurrentTime = new Date();

  constructor(public socket: Socket) {
  }

  ngOnInit(): void {
    this.createUser();

  }

  createUser() {
    // const username = prompt('Introduce tu nombre de usuario', 'marc');
    const username = 'marc';
    if (username) {
      this.username = username;
      this.socket.emit('username', this.username);
    } else {
      this.socket.emit('nadie');
      this.createUser()
    }
  }

  changeUserName() {
    const newName = prompt('Escribe tu nuevo nombre...', 'antonio')
    this.username = newName;
    this.socket.emit('changeName', newName);

  }

  createNewChat() {
    const chatName = prompt('Nombre del chat')
    const newChat = `${chatName} ${this.chats.length + 1}`
    this.chats.push({messages: [], name: newChat, id: this.chats.length + 1})
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
  }

  sendMessage(message: string) {
    if (this.selectedChat) {
      this.socket.emit('mensaje', message, this.username, this.selectedChat.id);
      this.selectedChat.messages.push(`${this.username} : ${message}`);

      this.getCurrentTime.getTime();
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  deleteChat(event: MouseEvent, chat: Chat) {
    this.chats.splice(chat.id - 1, 1);
  }
}
