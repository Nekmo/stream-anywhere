import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Path = {
  name: string,
  url: string,
  path: string,
  type: string,
  mimetype: string,
};


@Component({
  selector: 'select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss']
})
export class SelectFileComponent implements OnInit {
  directories: Path[] = [];
  files: Path[] = [];

  @Input() directory: string = '';
  @Output() selectedFile = new EventEmitter<Path>();


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.listPaths();
  }

  listPaths() {
    this.http.get(`/api/paths/${this.directory}`).subscribe(data => {
      this.directories = <Path[]>data.filter((x) => x.type == 'directory');
      this.files = <Path[]>data.filter((x) => x.type != 'directory');
    });
  }

  selectDir(path: Path) {
    this.directory = path.path;
    this.listPaths();
  }

  selectFile(path: Path) {
    this.selectedFile.emit(path);
  }
}
