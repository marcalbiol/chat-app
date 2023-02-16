import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import {FormsModule} from "@angular/forms";
import {ChatModule} from "../chat/chat.module";
import {SocketIoModule} from "ngx-socket-io";
import {ServiceChatService} from "../service-chat.service";

@NgModule({
  declarations: [
    ViewComponent
  ],
  exports: [
    ViewComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChatModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000' })
  ],
  providers: [ServiceChatService]
})
export class ViewModule { }
