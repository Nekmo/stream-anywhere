import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-select-file-dialog',
  templateUrl: './select-file-dialog.component.html',
  styleUrls: ['./select-file-dialog.component.scss']
})
export class SelectFileDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<SelectFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  selectFile(video) {
    this.dialogRef.close(video);
  }

}
