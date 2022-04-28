import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAddElementConfigComponent } from './offer-add-element-config.component';

describe('OfferAddElementConfigComponent', () => {
  let component: OfferAddElementConfigComponent;
  let fixture: ComponentFixture<OfferAddElementConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferAddElementConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAddElementConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
