import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Path = {
  name: string,
  path: string,
};

@Component({
  selector: 'select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss']
})
export class SelectFileComponent implements OnInit {
  paths: Path[] = [];

  @Input() directory: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.listPaths();
  }

  listPaths() {
    this.http.get(`/api/paths/${this.directory}`).subscribe(data => {
      // this.router.navigate(['/videos', data['id']])
      this.paths = <Path[]>data;
    });
  }

  selectDir(path: Path) {
    this.directory = path.path;
    this.listPaths();
  }
}
