import {ChangeDetectorRef , AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {Socket} from 'ngx-socket-io';


/* https://mdbootstrap.com/docs/standard/extended/chat/ */
interface User {
  name: string | null;
}

interface Chat {
  id: number;
  name: string | unknown;
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
  chats: Chat[] = [];
  newMessage: { [key: number]: string } = {};
  users: User[] = [];

  selectedChat?: Chat;
  // @Output() usernameChanged = new EventEmitter<string | null>();
  @Output() public username?: string | any;

  public getCurrentTime = new Date();

  constructor(public socket: Socket, private changes: ChangeDetectorRef) {
    this.socket.on('chat-list', this.handleChatsUpdated.bind(this))
    this.socket.on('newMensaje', this.handleNewMessages.bind(this))
    this.createUser();
  }


  ngOnInit(): void {
  }

  createUser() {
    const username = prompt('Introduce tu nombre de usuario', 'marc');
    if (username) {
     this.users.push({name: username})
      this.username = username;
      this.socket.emit('username', this.users.map(value => value.name));
    } else {
      this.createUser()
    }
  }

  changeUserName() {
    const newName = prompt('Escribe tu nuevo nombre...', 'antonio')
    this.users.map(value => value.name = newName);
    this.socket.emit('changeName', newName);

  }
  createNewChat() {
    const chatName = prompt('Nombre del chat', 'default')
    this.socket.emit('create-room', chatName)
  }

  handleChatsUpdated(updatedChats: Chat[]) {
    this.chats = updatedChats;
    this.changes.detectChanges();
  }
  handleNewMessages(updatedChats: string) {
    this.selectedChat?.messages.push(updatedChats);
    this.changes.detectChanges();
  }



  selectChat(chat: Chat) {
    this.selectedChat = chat;
  }


  sendMessage(message: string) {
    if (this.selectedChat) {
      console.log(this.selectedChat)
      this.socket.emit('mensaje', this.selectedChat.id, message);
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
    console.log(chat)
    console.log(chat.id)
    this.chats.splice(chat.id, 1);
  }

}
