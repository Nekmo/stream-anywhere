import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-select-video',
    templateUrl: './select-video.component.html',
    styleUrls: ['./select-video.component.scss']
})
export class SelectVideoComponent implements OnInit {

    constructor(private http: HttpClient,
                private router: Router) { }

    selectVideoForm = new FormGroup({
        // name: new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        // }),
        url: new FormControl('', Validators.required),
    });


    ngOnInit() {
    }

    addVideo() {
        this.http.post('/api/videos', this.selectVideoForm.value).subscribe(data => {
            this.router.navigate(['/videos', data['id']])
        });
    }

}
