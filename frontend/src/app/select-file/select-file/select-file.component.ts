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
  _directories: Path[] = [];
  _files: Path[] = [];
  directories: Path[] = [];
  files: Path[] = [];

  directoriesHidden: boolean = true;
  filesHidden: boolean = true;

  @Input() directory: string = '';
  @Output() selectedFile = new EventEmitter<Path>();


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.listPaths();
  }

  listPaths() {
    this.http.get<PathPagination>(`/api/paths/${this.directory}`).subscribe(data => {
      let results = data.results;
      this._directories = results.filter((x) => x.type == 'directory');
      this._files = results.filter((x) => x.type != 'directory');
      this.directoriesHidden = true;
      this.filesHidden = true;
      this.toggleDirectories();
      this.toggleFiles();
    });
  }

  toggleDirectories() {
    this.directoriesHidden = !this.directoriesHidden;
    this.directories = (!this.directoriesHidden ? this._directories : []);
  }

  toggleFiles() {
    this.filesHidden = !this.filesHidden;
    this.files = (!this.filesHidden ? this._files : []);
  }

  selectDir(path: Path) {
    this.directory = path.path;
    this.listPaths();
  }

  selectFile(path: Path) {
    this.selectedFile.emit(path);
  }
}
