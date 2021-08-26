import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailsProductComponent } from './home-details-product.component';

describe('HomeDetailsProductComponent', () => {
  let component: HomeDetailsProductComponent;
  let fixture: ComponentFixture<HomeDetailsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
