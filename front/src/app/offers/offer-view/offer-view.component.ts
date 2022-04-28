import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../model/order';
import { OrderHeader } from '../model/order-header';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getOffer, getAllHeaderOrderWitchElem, getSumOffert } from '../state/offers.selectors';
import { first, finalize } from 'rxjs/operators';
import { ProductPriceOrderCustomerLoad } from 'src/app/price-list/price-list.action';
import { OrderElem } from '../model/order-elem';

@Component({
  selector: 'offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.css']
})
export class OfferViewComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // data of order
  orderId: string;
  offer: Order;

  sums: { sumWart: number, sumDiscount: number, sumZakup: number, sumBrutto: number, sumUpust: number };
  orderHeader: OrderHeader[] = [];
  loadList = false;



  constructor(private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('offerid');
    const orderSub = this.store.pipe(select(getOffer(this.orderId)),
      first(),
      finalize(() => this.dispathElement()))
      .subscribe(
        data => {
          this.offer = data;
        }
      );
    this.subscription.push(orderSub);
    const orderHeaderSub = this.store.pipe(
      select(getAllHeaderOrderWitchElem(this.orderId)))
      .subscribe(data => this.orderHeader = data
      );
    this.subscription.push(orderHeaderSub);
    const sumSunSub = this.store.pipe(
      select(getSumOffert(this.orderId))
    ).subscribe(
      data => {
        this.sums = data;
        //   this.discount = data.sumUpust;
      }
    );
    this.subscription.push(sumSunSub);

  }

  transform(n: any): any {
    var string = n.toString(),
    units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

// var and = custom_join_character || 'and';

/* Is number zero? */
if (parseInt(n) === 0) {
    return 'zero';
} else {
  string = (parseInt(n)).toString();
}

/* Array of units as words */
units = ['', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewieć', 'dziesieć', 'jedenaście', 
'dwanaście', 'trzynaście', 'czternaście', 'pietnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewietnaście'];

/* Array of tens as words */
tens = ['', '', 'dwadzieścia', 'trzdzieści', 'czterdzieści', 'pięćdziesiat', 'sześćdziesiat', 'siedemdziesiąt', 'osiemdziesiąt', 
'dziewiećdziesiąt'];

/* Array of scales as words */
scales = ['', 'tysiąc', 'milion', 'miliard', 'bilion', 'kwadrylion', 'kwintylion', 'sekstylion', 'septillion',
'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion',
'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

/* Split user arguemnt into 3 digit chunks from right to left */
start = string.length;
chunks = [];
while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
}

/* Check if function has enough scale words to be able to stringify the user argument */
chunksLen = chunks.length;
if (chunksLen > scales.length) {
    return '';
}

/* Stringify each integer in each chunk */
words = [];
for (i = 0; i < chunksLen; i++) {

    chunk = parseInt(chunks[i]);

    if (chunk) {

        /* Split chunk into array of individual integers */
        ints = chunks[i].split('').reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
            ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
            words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
            words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
            words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {

            /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
            if (ints[2] || !i && chunksLen) {
              //  words.push(and);
            }

        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
            words.push(word + ' sto');
        }

    }

}

 return words.reverse().join(' ') + ' ' + Math.floor(((n - parseInt(n))*100)) + '/100';
  }

  slowa(pole_liczba: number) {
    
   // przypisanie obiektu pola tekstowego do zmiennej

   // pobranie liczby
   var liczba = parseInt(pole_liczba.toString());

   var jednosci = ["", " jeden", " dwa", " trzy", " cztery", " pięć", " sześć", " siedem", " osiem", " dziewięć"];
   var nascie = ["", " jedenaście", " dwanaście", " trzynaście", " czternaście", " piętnaście", " szesnaście", " siedemnaście", " osiemnaście", " dziewietnaście"];
   var dziesiatki = ["", " dziesięć", " dwadzieścia", " trzydzieści", " czterdzieści", " pięćdziesiąt", " sześćdziesiąt", " siedemdziesiąt", " osiemdziesiąt", " dziewięćdziesiąt"];
   var setki = ["", " sto", " dwieście", " trzysta", " czterysta", " pięćset", " sześćset", " siedemset", " osiemset", " dziewięćset"];
   var grupy = [
      ["" ,"" ,""],
      [" tysiąc" ," tysiące" ," tysięcy"],
      [" milion" ," miliony" ," milionów"],
      [" miliard"," miliardy"," miliardów"],
      [" bilion" ," biliony" ," bilionów"],
      [" biliard"," biliardy"," biliardów"],
      [" trylion"," tryliony"," trylionów"]];
             
   // jezeli pole zawiera poprawna wartosc calkowita
   
   	
      var wynik = '';
      var znak = '';
      if (liczba == 0)
         wynik = "zero";
      if (liczba < 0) {
         znak = "minus";
         liczba = -liczba;
      }
           
      var g = 0;
      while (liczba > 0) {
         var s = Math.floor((liczba % 1000)/100);
         var n = 0;
         var d = Math.floor((liczba % 100)/10);
         var j = Math.floor(liczba % 10);
              
         if (d == 1 && j>0) {
            n = j;
            d = 0;
            j = 0;
         }

         var k = 2;
         if (j == 1 && s+d+n == 0)
            k = 0;
         if (j == 2 || j == 3 || j == 4)
            k = 1;
         if (s+d+n+j > 0)
            wynik = setki[s]+dziesiatki[d]+nascie[n]+jednosci[j]+grupy[g][k]+wynik;

         g++;
         liczba = Math.floor(liczba/1000);
      }
      return (znak + wynik) + ' ' + Math.floor(((pole_liczba - parseInt(pole_liczba.toString()))*100)) + '/100';;
   


  }

  dispathElement() {
    if (!this.loadList) {
      this.store.dispatch(ProductPriceOrderCustomerLoad
        ({
          producPriceParams: {
            category: '', filter: '',
            sortDirection: 'asc',
            sortField: 'name', pageIndex: 1,
            pageSize: 10, priceType: this.offer.customer.priceId,
            orderId: this.offer.id, custonerId: this.offer.customerId
          }
        }));
      this.loadList = true;
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe);
  }

  sumWartosct(elem: OrderElem[]) {
    if (elem.length > 0) {
      return elem.map(s => (s.price * s.quantity)).reduce((p, n) => p + n);
    }
    return 0;
  }

  sumDiscount(elem: OrderElem[]) {
    if (elem.length > 0) {
      const sum: number = elem.map(s => s.priceAfterDiscount).reduce((p, n) => p + n);
      // this.offer.value = Object.assign({}, sum);
      return sum;
    }
    return 0;
  }
  sumBrutto(elem: OrderElem[]) {
    if (elem.length > 0) {
      return elem.map(s => s.priceBrutto).reduce((p, n) => p + n);
    }
    return 0;
  }

}
