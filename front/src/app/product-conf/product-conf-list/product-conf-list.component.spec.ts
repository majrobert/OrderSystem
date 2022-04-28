import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfListComponent } from './product-conf-list.component';

describe('ProductConfListComponent', () => {
  let component: ProductConfListComponent;
  let fixture: ComponentFixture<ProductConfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
