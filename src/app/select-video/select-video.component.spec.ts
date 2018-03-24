import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVideoComponent } from './select-video.component';

describe('SelectVideoComponent', () => {
  let component: SelectVideoComponent;
  let fixture: ComponentFixture<SelectVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
