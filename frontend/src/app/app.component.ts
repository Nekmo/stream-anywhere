import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from "ngx-plyr";
import Plyr from 'plyr';
import {HttpClient} from "@angular/common/http";
import {SelectFileComponent} from "./select-file/select-file/select-file.component";
import {MatDialog} from "@angular/material";

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


type VideoPagination = {
  count: number,
  next: string|null,
  previous: string|null,
  results: Video[],
}

const htmlControls = `
<div class="plyr__controls plyr_controls__top">
    <div id='title'>
    	This is some text
    </div>
</div>
`;

const htmlControlsButtons = `
<button class="plyr__controls__item plyr__control" type="button" data-plyr="foo">
<i class="material-icons">
folder
</i>
<span class="plyr__sr-only">PIP</span>
</button>
`;


function addControls(html, addFunction) {
  let controls = new DOMParser().parseFromString(html, 'text/html');
  let children = Array.from(controls.body.children);
  for (let i = 0; i < children.length; i++) {
    addFunction(children[i]);
  }
}


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

  options: any;

  currentVideo: Video = null;

  constructor(private http: HttpClient,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePosition();
    setTimeout(() => {
      this.playLastVideo();
      let plyrVideo = this.getPlyrVideoElement();
      addControls(htmlControls,(control) => {
        plyrVideo.appendChild(control);
      });
      setTimeout(() => {
        let menu = plyrVideo.querySelector('.plyr__menu');
        addControls(htmlControlsButtons, (button) => {
          button.addEventListener('click', () => {
            this.filesDialog();
          });
          menu.parentNode.insertBefore(button, menu);
        })
      }, 500);
    }, 700);
    // this.options = {
    //   controls: [
    //     'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings',
    //     (new DOMParser().parseFromString(htmlControlsButtons, 'text/html').body.firstChild),
    //     'pip', 'airplay', 'fullscreen']
    // }
  }

  filesDialog() {
    let dialogRef = this.dialog.open(SelectFileComponent, {
      height: '400px',
      width: '600px',
    });
  }

  getPlyrVideoElement() {
    return document.getElementById('video').getElementsByClassName('plyr--video')[0]
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
      this.currentVideo = <Video>video;
      this.play();
    }, 300);
  }

  playFilePath(path) {
    this.http.post<Video>('/api/videos/', {
      path: path.path,
    }).subscribe((data) => {
      this.playVideo(data);
    });
  }

  playLastVideo() {
    this.http.get<Video>('/api/videos/first/').subscribe((video) => {
      this.playVideo(video);
    });
  }

}
