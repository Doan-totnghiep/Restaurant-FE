import { ServicesModel } from './../../model/services-model';
import { ProductModel } from './../../model/product-model';
import { ProductService } from './../../service/product/product.service';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product = new ProductModel();
  selectunit: string;
  selectservice: number;
  listService:ServicesModel[];
  OneFile: File = null
    constructor(private _productService:ProductService, private _roter: Router,
      private dialogService: DialogService, private notificationService: NotificationService) { }

    ngOnInit(): void {
      this.ListServices();
    }
    Selected(event) {
      this.OneFile = event.target.files[0];
    }
    selectUnit (event){
      this.selectunit = event.target.value;
    }

    Submit() {
      this.dialogService.openCofirmDialog('Bạn có chắc muốn thêm tài khoản mới không ?')
      .afterClosed().subscribe(res => {
        if(res){
      const createuserData = {
        food_name : this.product.food_name,
        price  : this.product.price,
        unit : this.selectunit,
        content : this.product.content,
        service_id :this.selectservice,
        id : 0,
        avatar: "0"
        // service_id :this.selectservice,
      }

    this._productService.SaveProduct(createuserData).subscribe(data => {
      this._productService.UploadFile(this.OneFile, data.id).subscribe(data => {
        console.log(data);
        this.goToProductList();
      })
      this.notificationService.success('! Thêm thành công');
    })
    }
  })
 
}
  selectServices (event){
    this.selectservice = event.target.value;
  }

  goToProductList() {
      this._roter.navigate(['product/list-product'])
    }

    ListServices(){
      this._productService.GetService().subscribe(
        response => {
        this.listService = response

        }
      );
    }
  }
