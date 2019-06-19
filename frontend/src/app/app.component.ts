import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from "ngx-plyr";
import Plyr from 'plyr';
import {HttpClient} from "@angular/common/http";

type Video = {
  id: number,
  url: string,
  name: string,
  path: string,
  checksum: string,
  status: string,
  position: number,
  duration: number,
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  @ViewChild(PlyrComponent, { static: true })
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [
    // {
    //   src: 'http://127.0.0.1:8000/',
    //   type: 'video/mp4',
    // },
    // {
    //   src: 'bTqVqk7FSmY',
    //   provider: 'youtube',
    // }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

  playVideo(video: Video) {
    this.videoSources = [
      {
        src: `http://127.0.0.1:8000${video.path}`,
        type: 'video/mp4',
      },
    ];
    setTimeout(() => {
      this.play();
    });
  }

  playFilePath(path) {
    this.http.post('/api/videos/', {
      path: path.path,
    }).subscribe((data) => {
      this.playVideo(data)
    });
  }

}
