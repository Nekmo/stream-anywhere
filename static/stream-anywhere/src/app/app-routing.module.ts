import { NgModule } from '@angular/core';
import { VideoComponent }      from './video/video.component';
import {RouterModule, Routes} from "@angular/router";
import {SelectVideoComponent} from "./select-video/select-video.component";

const routes: Routes = [
    { path: '', redirectTo: '/add', pathMatch: 'full' },
    { path: 'add', component: SelectVideoComponent, },
    { path: 'videos/:id', component: VideoComponent },
];

@NgModule({

    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],

    declarations: []
})
export class AppRoutingModule { }
