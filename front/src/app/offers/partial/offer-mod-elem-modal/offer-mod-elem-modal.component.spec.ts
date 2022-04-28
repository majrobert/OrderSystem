import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferModElemModalComponent } from './offer-mod-elem-modal.component';

describe('OfferModElemModalComponent', () => {
  let component: OfferModElemModalComponent;
  let fixture: ComponentFixture<OfferModElemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferModElemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferModElemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
