import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailsBlogComponent } from './home-details-blog.component';

describe('HomeDetailsBlogComponent', () => {
  let component: HomeDetailsBlogComponent;
  let fixture: ComponentFixture<HomeDetailsBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailsBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailsBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
