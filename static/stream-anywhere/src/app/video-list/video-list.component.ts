import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    items;

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.http.get('/api/videos').subscribe(data => {
            this.items = data;
        });
    }

    goToVideo(id) {
        this.http.post('/api/videos', id).subscribe(data => {
            this.router.navigate(['/videos', data['id']])
        });
    }
}
