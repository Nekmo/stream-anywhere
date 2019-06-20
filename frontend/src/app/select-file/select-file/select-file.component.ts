import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Path = {
  name: string,
  url: string,
  path: string,
  type: string,
  mimetype: string,
};


type PathPagination = {
  count: number,
  next: string|null,
  previous: string|null,
  results: Path[],
}


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
    this.http.get<PathPagination>(`/api/paths/${this.directory}`).subscribe(data => {
      let results = data.results;
      this.directories = results.filter((x) => x.type == 'directory');
      this.files = results.filter((x) => x.type != 'directory');
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
