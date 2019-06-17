import {Component, ViewChild} from '@angular/core';
import {PlyrComponent} from "ngx-plyr";
import Plyr from 'plyr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [
    {
      src: 'http://127.0.0.1:8000/',
      type: 'video/mp4',
      // src: 'bTqVqk7FSmY',
      // provider: 'youtube',
    },
  ];

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

}
