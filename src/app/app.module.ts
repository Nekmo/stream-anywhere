import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from "@angular/material";
import { SelectVideoComponent } from './select-video/select-video.component';


@NgModule({
    declarations: [
        AppComponent,
        VideoComponent,
        SelectVideoComponent,
    ],
    imports: [
        BrowserModule,
        BrowserModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
