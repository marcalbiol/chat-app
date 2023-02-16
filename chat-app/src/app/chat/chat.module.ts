import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from "@angular/forms";
import {SocketIoModule} from "ngx-socket-io";



@NgModule({
  declarations: [
    ChatComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000' })
  ]
})
export class ChatModule { }
