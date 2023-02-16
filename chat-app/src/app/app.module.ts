import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {ChatModule} from "./chat/chat.module";
import {ViewModule} from "./view/view.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChatModule,
    ViewModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
