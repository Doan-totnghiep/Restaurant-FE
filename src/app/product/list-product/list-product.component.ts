import { ProductService } from './../../service/product/product.service';
import { ProductModel } from './../../model/product-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
 totalRecords:string;
  page: number= 1;
  searchValue:string;
  product: ProductModel[]
  constructor(private productService : ProductService, private _router :Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.productService.GetProduct().subscribe(data=>{
      this.product=data.sort((a,b) => b.id - a.id);
      console.log(data);
    })
  }
  getAllProduct(){
    this.productService.GetProduct().subscribe(data=>{
      this.product=data.sort((a,b) => b.id - a.id);
      console.log(data);
    })
  }
  UpdateProduct(id:number){
    this._router.navigate(['/product/update-product',id])
  }
  deleteProduct(id:number){
    this.dialogService.openCofirmDialog('Bạn có chắc muốn xóa không ?')
    .afterClosed().subscribe(res => {
      if(res){
        this.productService.DeleteProduct(id).subscribe(data=>{
          this.productService.GetProduct().subscribe(data=>{
            this.product=data.sort((a,b) => b.id - a.id);
            console.log(data);
            this.notificationService.success('! Xóa thành công');
          })
        })
      }
    });
  }
  viewProduct(id:number){
    this._router.navigate(['/product/details-product',id])
  }

  onSearch(){
    console.log(this.searchValue);
    
    if (this.searchValue !== ""){
      this.productService.search(this.searchValue).subscribe(
        data => {
          this.product = data
        }
      )
    } else{
      this.getAllProduct()
    }
  }
}
