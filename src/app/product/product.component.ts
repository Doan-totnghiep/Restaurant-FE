import { UserService } from 'src/app/service/user-service/user.service';
import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({ templateUrl: 'product.component.html' })
export class ProductComponent implements OnInit {
  user:User;
  showMsg: boolean = false;
  constructor(private _service : UserService) {
    this._service.user.subscribe(x => this.user = x)
  }
  ngOnInit(){
  }
}
