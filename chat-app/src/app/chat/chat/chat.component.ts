import {Component, Injectable, OnInit} from '@angular/core';
import {ServiceChatService} from "../../service-chat.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit{
  messages: string[] = [];


  constructor(public chatService: ServiceChatService, public socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('mensaje', (mensaje: string) => {
      console.log(`Mensaje recibido: ${mensaje}`);
      this.messages.push(mensaje);
    });
  }

  sendMessage(message: string): void {
    if (this.chatService.selectedChat) {
      this.socket.emit('mensaje', message, this.chatService.selectedChat.id);
      this.messages.push(`Yo: ${message}`);
      this.scrollToBottom();
    }
  }

   scrollToBottom(): void {
    setTimeout(() => {
      const element = document.getElementById('messagesView');
      // @ts-ignore
      element.scrollTop = element.scrollHeight;
    }, 100);
  }
}
