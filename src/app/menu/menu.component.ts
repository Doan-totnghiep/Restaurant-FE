import { ProductService } from './../service/product/product.service';
import { BlogService } from './../service/blog-service/blog.service';
import { BlogModel } from 'src/app/model/blog-model';
import { ProductModel } from './../model/product-model';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../model/order-model';
import { OrderService } from '../service/order-service/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  totalRecords:string;
  page: number= 1;
  pagee: number= 1;
  post: number= 1;
  searchValue:string;
  product:ProductModel[];
  blog:BlogModel[];
  productbylist1:ProductModel[];
  breakfast:number =1;
  productbylist2:ProductModel[];
  lunch:number =2;
  productbylist3:ProductModel[];
  dinner:number =3;
  selecthour: string;
  selectperson: string;
  selectth: string;
  OneFile: File = null
  constructor(private blogService : BlogService, private productService : ProductService,
    
    private _orderService: OrderService) { }

 
  order = new OrderModel();

  showMsg: boolean = false;
  ngOnInit(): void {
    this.productService.GetProduct().subscribe(data=>{
      this.product=data
    })
    this.blogService.GetBlog().subscribe(data=>{
      this.blog=data
    })
      this.ListProductByService1();
      this.ListProductByService2();
      this.ListProductByService3();
  }
  ListProductByService1(){
      this.productService.GetProductByService(this.breakfast).subscribe(data=>{
        this.productbylist1=data
      })
  }
  ListProductByService2(){
    this.productService.GetProductByService(this.lunch).subscribe(data=>{
      this.productbylist2=data
    })
}
ListProductByService3(){
  this.productService.GetProductByService(this.dinner).subscribe(data=>{
    this.productbylist3=data
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
}
