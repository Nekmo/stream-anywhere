import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFileDialogComponent } from './select-file-dialog.component';

describe('SelectFileDialogComponent', () => {
  let component: SelectFileDialogComponent;
  let fixture: ComponentFixture<SelectFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
