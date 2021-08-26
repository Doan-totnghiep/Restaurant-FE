import { Router } from '@angular/router';
import { BlogService } from './../service/blog-service/blog.service';
import { ProductService } from './../service/product/product.service';
import { ProductModel } from 'src/app/model/product-model';
import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../model/blog-model';
import { OrderModel } from '../model/order-model';
import { OrderService } from '../service/order-service/order.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalRecords: string;
  page: number = 1;
  searchValue: string;
  product: ProductModel[];
  blog: BlogModel[];
  order = new OrderModel();

  showMsg: boolean = false;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
};

  constructor(private blogService: BlogService, private productService: ProductService,
    private _orderService: OrderService, private _router: Router, private snackBar: MatSnackBar) { }
  selecthour: string;
  selectperson: string;
  selectth: string;
  OneFile: File = null
  ngOnInit(): void {
    this.productService.GetProduct().subscribe(data => {
      this.product = data
    })
    this.blogService.GetBlog().subscribe(data => {
      this.blog = data
    })

  }
  Selected(event) {
    this.OneFile = event.target.files[0];
  }

  selectHour(event) {
    this.selecthour = event.target.value;
  }
  selectPerson(event) {
    this.selectperson = event.target.value;
  }
  selectTh(event) {
    this.selectth = event.target.value;
  }
  Submit() {
    const createorderData = {
      fullname: this.order.fullname,
      // date: this.order.date,
      hour: this.selecthour,
      person: this.selectperson,
      phonenumber: this.order.phonenumber,
      th: this.selectth,

    }
    console.log(createorderData);
    this._orderService.SaveOrder(createorderData).subscribe(data => {


      this.goToOrderHome();
      this.resetForm();
    })

  }

  resetForm() {
    this.order = {
      id: 0,
      fullname: "",
      hour: "",
      person: "",
      phonenumber: "",
      th: "",
    }
  }
  goToOrderHome() {
    this.showMsg = true;
  }
  
  // openSnackBar(message, action) {
  //   this.snackBar.open(message, action);
  // }

}
