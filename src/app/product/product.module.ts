import { UpdateBlogComponent } from './../blog/update-blog/update-blog.component';
import { ListBlogComponent } from './../blog/list-blog/list-blog.component';
import { DetailsBlogComponent } from './../blog/details-blog/details-blog.component';
import { CreateBlogComponent } from './../blog/create-blog/create-blog.component';

import { ListProductComponent } from './list-product/list-product.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductComponent } from './product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { HomeProductComponent } from './home-product/home-product.component';
import { DetailsUserComponent } from '../details-user/details-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateOrderComponent } from '../order/create-order/create-order.component';
import { DetailsOrderComponent } from '../order/details-order/details-order.component';
import { ListOrderComponent } from '../order/list-order/list-order.component';
import { UpdateOrderComponent } from '../order/update-order/update-order.component';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';





@NgModule({
  declarations: [
    ProductComponent,
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DetailsProductComponent,
    HomeProductComponent,

    UpdateUserComponent,
    ListUserComponent,
    CreateUserComponent,
    DetailsUserComponent,

    CreateBlogComponent,
    DetailsBlogComponent,
    ListBlogComponent,
    UpdateBlogComponent,

    CreateOrderComponent,
    DetailsOrderComponent,
    ListOrderComponent,
    UpdateOrderComponent,


  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
    
   
    
    ],
  providers: [],
  entryComponents:[MatConfirmDialogComponent]
})
export class ProductModule { }
