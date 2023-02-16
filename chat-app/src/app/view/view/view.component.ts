import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import { Socket } from 'ngx-socket-io';


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
export class ViewComponent implements OnInit{
  @ViewChild('messages') messagesView!: ElementRef;
  chats: Chat[] = [
    { id: 1, name: 'Chat 1', messages: [], unread: 0 },
    { id: 2, name: 'Chat 2', messages: [], unread: 0 },
    { id: 3, name: 'Chat 3', messages: [], unread: 0 },
  ];
  selectedChat?: Chat;

  constructor(public socket: Socket) { }
  ngOnInit(): void {
    this.socket.on('mensaje', (mensaje: string, chatId: number) => {
      const chat = this.chats.find(c => c.id === chatId);
      if (chat) {
        chat.messages.push(mensaje);
        if (chat !== this.selectedChat) {
          chat.unread++;
        }
      }
      this.scrollToBottom();
    });
  }
  selectChat(chat: Chat): void {
    this.selectedChat = chat;
    chat.unread = 0;
    this.scrollToBottom();
  }

  sendMessage(message: string): void {
    if (this.selectedChat) {
      this.socket.emit('mensaje', message, this.selectedChat.id);
      this.selectedChat.messages.push(`Yo: ${message}`);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const element = this.messagesView.nativeElement;
      element.scrollTop = element.scrollHeight;
    }, 100);
  }
}
