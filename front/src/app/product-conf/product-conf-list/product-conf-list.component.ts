import { Component, OnInit } from '@angular/core';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { ProductConfEditModalComponent } from '../product-conf-edit-modal/product-conf-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'product-conf-list',
  templateUrl: './product-conf-list.component.html',
  styleUrls: ['./product-conf-list.component.css']
})
export class ProductConfListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addmodal(){
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Dodaj produkt',
      dane: undefined,
      mode: 'add'
    };
    const dialogRef = this.dialog.open(ProductConfEditModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>
      console.log(res));
  }

}
