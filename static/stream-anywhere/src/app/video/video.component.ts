import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {VgAPI, VgMedia} from "videogular2/core";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {


  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
  ) { }

  id: number;
  url: string;
  videoApi: VgAPI;
  position: number;

  ngOnInit() {
      this.getVideo();
  }

  getVideo() {
      this.id = +this.route.snapshot.paramMap.get('id');

      this.http.get('/api/videos/' + this.id).subscribe(data => {
          this.url = data['url'];
          this.position = data['position'];
      });
  }

    onPlayerReady(api: VgAPI) {
        this.videoApi = api;
        this.videoApi.seekTime(this.position);
        this.videoApi.play();

        this.videoApi.getDefaultMedia().subscriptions.progress.subscribe(
            () => {
                let media = this.videoApi.getDefaultMedia();
                if(media.state != 'playing'){
                    return
                }
                this.position = media.currentTime;
                this.http.patch('/api/videos/' + this.id, {
                    position: media.currentTime
                }).subscribe();
            }
        );
    }


}
