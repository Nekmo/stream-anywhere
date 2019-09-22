import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef, HostListener,
  Injector, Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {PlyrComponent} from "ngx-plyr";
import Plyr from 'plyr';
import {HttpClient} from "@angular/common/http";
import {SelectFileComponent} from "./select-file/select-file/select-file.component";
import {MatDialog} from "@angular/material";
import {SelectFileDialogComponent} from "./select-file/select-file-dialog/select-file-dialog.component";
import {first} from "rxjs/operators";

type Collection = {
  id: number,
}

type Video = {
  id: number,
  url: string,
  name: string,
  path: string,
  checksum: string,
  status: string,
  position: number,
  duration: number,
  collection: Collection,
};


type VideoPagination = {
  count: number,
  next: string|null,
  previous: string|null,
  results: Video[],
}

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
  selector: 'top-controls',
  template: `
    <div class="plyr__controls plyr_controls__top">
      <div id='title'>
      	{{ title }}
      </div>
  </div>  
  `,
})
export class TopControlsComponent implements OnInit {
  @Input() title: string = '';

  ngOnInit(): void {
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
  componentRef: any;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              ) { }

  ngOnInit(): void {
    this.updatePosition();
    setTimeout(() => {
      this.playLastVideo();
      let plyrVideo = this.getPlyrVideoElement();

      // addControls(getTopHtmlControls(''),(control) => {
      //   plyrVideo.appendChild(control);
      // });
      this.appendComponentToBody(TopControlsComponent, plyrVideo);

      // setTimeout(() => {
      //   let menu = plyrVideo.querySelector('.plyr__menu');
      //   addControls(htmlControlsButtons, (button) => {
      //     button.addEventListener('click', () => {
      //       this.filesDialog();
      //     });
      //     menu.parentNode.insertBefore(button, menu);
      //   })
      // }, 500);
    }, 700);

    // this.options = {
    //   controls: [
    //     'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings',
    //     (new DOMParser().parseFromString(htmlControlsButtons, 'text/html').body.firstChild),
    //     'pip', 'airplay', 'fullscreen']
    // }
  }

  filesDialog() {
    let dialogRef = this.dialog.open(SelectFileDialogComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'dialog-no-padding',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.playFilePath(result)
      // this.animal = result;
    });
  }

  getPlyrVideoElement() {
    return document.getElementById('video').getElementsByClassName('plyr--video')[0]
  }

  updatePosition() {
    if(this.currentVideo && this.player && this.player.currentTime > 0 && this.player.playing) {
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
    var promise = this.player.media.play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          setTimeout(() => this.play(), 100);
        });
    }
  }

  ended(): void {
    this.http.get(`/api/collections/${this.currentVideo.collection.id}/next/`).subscribe((path) => {
      this.playFilePath(path);
    });
  }

  playAfterSeeking() {
    if(this.plyr.plyrSeeking)
    setTimeout(() => this.playAfterSeeking());
  }

  playVideo(video: Video) {
    this.videoSources = [
      {
        src: `http://${window.location.hostname}:8000${video.path}`,
        type: 'video/mp4',
      },
    ];

    let plyrVideo = this.getPlyrVideoElement();
    setTimeout(() => {
      let menu = plyrVideo.querySelector('.plyr__menu');
      addControls(htmlControlsButtons, (button) => {
        button.addEventListener('click', () => {
          this.filesDialog();
        });
        menu.parentNode.insertBefore(button, menu);
      })
    }, 500);


    setTimeout(() => {
      this.player.currentTime = video.position;
      this.currentVideo = <Video>video;

      this.plyr.plyrSeeked.pipe(first()).subscribe(() => {
        setTimeout(() => {
          this.play();
        }, 300);
      });
      // setTimeout(() => {
      //   this.play();
      // }, 1000);

      // Title
      this.componentRef.instance.title = video.name;
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

  appendComponentToBody(component: any, domRoot: Element) {
    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    domRoot.appendChild(domElem);

    // 5. Wait some time and remove it from the component tree and from the DOM
    // setTimeout(() => {
    //     this.appRef.detachView(componentRef.hostView);
    //     componentRef.destroy();
    // }, 3000);
  }

  // updateVideoSize() {
  //   if(this.player && this.player.ratio) {
  //     let height = window.innerHeight;
  //     let width = window.innerWidth;
  //     let ratio = this.player.ratio.split(':');
  //     ratio = parseInt(ratio[0]) / parseInt(ratio[1]);
  //     width = height * ratio;
  //     document.querySelector<HTMLElement>('#video video').style.width = `${width}px`;
  //   }
  // }

  @HostListener('window:resize')
  onWindowResize() {
      //debounce resize, wait for resize to finish before doing stuff
    // this.updateVideoSize();

      // if (this.resizeTimeout) {
      //     clearTimeout(this.resizeTimeout);
      // }
      // this.resizeTimeout = setTimeout((() => {
      //     console.log('Resize complete');
      // }).bind(this), 500);
  }


}
