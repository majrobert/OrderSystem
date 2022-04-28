import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferHandModElemModalComponent } from './offer-hand-mod-elem-modal.component';

describe('OfferHandModElemModalComponent', () => {
  let component: OfferHandModElemModalComponent;
  let fixture: ComponentFixture<OfferHandModElemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferHandModElemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferHandModElemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
