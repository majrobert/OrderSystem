import { Observable } from 'rxjs';
import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dict, DictElem } from '../model/dict';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  @ViewChild('slownikAddForm') slownikAddForm: NgForm;

  dict$: Observable<Dict[]>;
  dajNazwaSlownika = '';
  tempEditSlownik: Dict;
  tempDictElem: DictElem[] = [] ;
  constructor(private asminService: AdminService) { }

  ngOnInit(): void {
    this.dict$ = this.asminService.getAllDictionary();
  }

  skasujSlownik(dict: Dict) {
    this.tempEditSlownik = undefined;
    const vindowConfirm = window.confirm('Czy skasować pozycje słownika');
    if (vindowConfirm) {
      this.dict$ = this.asminService.deleteSlownik(dict.id);
    }
  }
  dodajSlownik(item) {
    this.slownikAddForm.resetForm();
  }

  edytujSlownik(dict: Dict) {
    this.tempEditSlownik = dict;
  }

  resetEditSlownikForm() {
    this.tempEditSlownik = undefined;
  }

  edytujSlownikElement(dictElem: DictElem[]) {
    console.log(dictElem);
    this.tempDictElem = dictElem;
  }

}
