import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderElem } from '../../model/order-elem';
import { Order } from '../../model/order';

@Component({
  selector: 'offer-add-element-config',
  templateUrl: './offer-add-element-config.component.html',
  styleUrls: ['./offer-add-element-config.component.css']
})
export class OfferAddElementConfigComponent implements OnInit {

  constructor() { }
  @Input() headerid: string ;
  @Input() offer: Order;
  @Input() elementEdit: OrderElem;
  @Output() addEmit: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
  }

  addElement(elementid: string) {
      this.addEmit.emit(elementid);
      if (this.elementEdit) {
        console.log(this.elementEdit);
      }
  }

}
