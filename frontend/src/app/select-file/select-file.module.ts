import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFileComponent } from './select-file/select-file.component';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule, MatListModule, MatTabsModule} from "@angular/material";
import { SelectFileDialogComponent } from './select-file-dialog/select-file-dialog.component';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    SelectFileComponent,
    SelectFileDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
  ],
  exports: [
    SelectFileComponent,
    SelectFileDialogComponent,
  ],
  entryComponents: [
    // SelectFileComponent,
    SelectFileDialogComponent,
  ]
})
export class SelectFileModule { }
