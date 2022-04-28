import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addCustomer() {
    this.router.navigate(['customers/edit/0']);
  }

}
