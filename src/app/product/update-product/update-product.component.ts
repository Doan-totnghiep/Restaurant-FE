import { ServicesModel } from './../../model/services-model';
import { pluck } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from './../../service/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';

import { ProductModel } from 'src/app/model/product-model';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private ProductService: ProductService,private route: ActivatedRoute, private _router: Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }
OneFile : File=null
formProduct: any;
user: ProductModel=new ProductModel();
selectservice: number;
listService:ServicesModel[];
url : string;
id:number;
selectunit: string;

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id')
    ).subscribe(id=>{
      this.ProductService.GetProductById(id).subscribe(data=>{
        this.formProduct = new FormGroup({
          id: new FormControl(data.id),
          food_name:new FormControl(data.food_name),
          price : new FormControl(data.price),
          avatar: new FormControl(data.avatar),
          unit :new FormControl(data.unit),
          content: new FormControl(data.content),
          service_id: new FormControl(data.service_id.id),
        })
        this.url = data.avatar;

      })
    })
    this.ListService();
  }
      Selected(event){
        this.OneFile=event.target.files[0];
      }


      selectServices (event){
        this.selectservice = event.target.value;
      }
      Submit(){
        this.dialogService.openCofirmDialog('Bạn có chắc muốn cập nhật không ?')
        .afterClosed().subscribe(res => {
          if(res){
          }
          this.ProductService.UpdateProduct(this.formProduct.value,this.formProduct.value.id) .subscribe(data =>{
            if(this.OneFile != null){
              this.ProductService.UploadFile(this.OneFile,data.id).subscribe(data =>{
                console.log(data);
        
        
            })
          }
          this.goToProductList();
          this.notificationService.success('! Cập nhật thành công');
        })
      })
      }
   
  
      ListService(){
        this.ProductService.GetService().subscribe(
          response => {
            this.listService = response
            console.log(this.listService)
          }
        );
      }
      goToProductList(){
        this._router.navigate(['/product/list-product'])
      }

}
