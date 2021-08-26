import { DetailsBlogComponent } from './../blog/details-blog/details-blog.component';
import { AuthGuard } from './../_helpers/auth.guard';
import { ProductComponent } from './product.component';
import { ListProductComponent } from './list-product/list-product.component';

import { DetailsProductComponent } from './details-product/details-product.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DetailsUserComponent } from '../details-user/details-user.component';
import { UpdateBlogComponent } from '../blog/update-blog/update-blog.component';
import { ListBlogComponent } from '../blog/list-blog/list-blog.component';
import { CreateBlogComponent } from '../blog/create-blog/create-blog.component';
import { UpdateOrderComponent } from '../order/update-order/update-order.component';
import { ListOrderComponent } from '../order/list-order/list-order.component';
import { CreateOrderComponent } from '../order/create-order/create-order.component';
import { DetailsOrderComponent } from '../order/details-order/details-order.component';



const routes: Routes = [
    {
        path: '', component: ProductComponent,
        children: [
            { path: '', component: HomeProductComponent },
            { path: 'list-product', component: ListProductComponent,canActivate: [AuthGuard] },
            { path: 'create-product', component: CreateProductComponent,canActivate: [AuthGuard] },
            { path: 'details-product/:id', component: DetailsProductComponent},
            { path: 'update-product/:id', component:  UpdateProductComponent},

            { path: 'user/:id',component:UpdateUserComponent},
            { path: 'list-user',component:ListUserComponent, canActivate: [AuthGuard] },
            { path: 'create',component:CreateUserComponent, canActivate: [AuthGuard] },
            { path: 'view-user/:id',component:DetailsUserComponent},

            { path: 'update-blog/:id',component:UpdateBlogComponent},
            { path: 'list-blog',component:ListBlogComponent, canActivate: [AuthGuard] },
            { path: 'create-blog',component:CreateBlogComponent, canActivate: [AuthGuard] },
            { path: 'view-blog/:id',component:DetailsBlogComponent},

            { path: 'update-order/:id',component:UpdateOrderComponent},
            { path: 'list-order',component:ListOrderComponent,},
            { path: 'create-order',component:CreateOrderComponent,},
            { path: 'view-order/:id',component:DetailsOrderComponent},

            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
