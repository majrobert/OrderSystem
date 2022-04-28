import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAddElemModalComponent } from './offer-add-elem-modal.component';

describe('OfferAddElemModalComponent', () => {
  let component: OfferAddElemModalComponent;
  let fixture: ComponentFixture<OfferAddElemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferAddElemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAddElemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
