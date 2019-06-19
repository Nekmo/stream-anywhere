import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFileComponent } from './select-file/select-file.component';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule, MatListModule} from "@angular/material";

@NgModule({
  declarations: [SelectFileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    SelectFileComponent,
  ]
})
export class SelectFileModule { }
