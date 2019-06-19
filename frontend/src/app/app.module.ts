import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PlyrModule} from "ngx-plyr";
import {SelectFileModule} from "./select-file/select-file.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlyrModule,
    SelectFileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
