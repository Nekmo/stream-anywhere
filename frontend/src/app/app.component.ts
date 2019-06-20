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

  currentVideo: Video = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updatePosition();
    setTimeout(() => {
      this.playLastVideo();
    }, 500);
  }

  updatePosition() {
    if(this.currentVideo && this.player && this.player.currentTime > 0) {
      this.http.patch(`/api/videos/${this.currentVideo.id}/`, {
        position: Math.floor(this.player.currentTime),
      }).subscribe();
    }
    setTimeout(() => {this.updatePosition()}, 3000);
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
      this.player.currentTime = video.position;
      this.play();
    }, 300);
  }

  playFilePath(path) {
    this.http.post<Video>('/api/videos/', {
      path: path.path,
    }).subscribe((data) => {
      this.playVideo(data);
      this.currentVideo = <Video>data;
    });
  }

  playLastVideo() {
    this.http.get<Video>('/api/videos/first/').subscribe((video) => {
      this.playVideo(video);
    });
  }

}
