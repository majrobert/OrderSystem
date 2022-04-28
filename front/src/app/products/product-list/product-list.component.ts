import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { ProductEditDialogComponent } from '../product-add/product-edit-dialog.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  addProduct() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Dodaj produkt',
      dane: undefined,
      mode: 'add'
    };
    // dialogConfig.height = '800px';
    const dialogRef = this.dialog.open(ProductEditDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
      }}
      );
  }

}
