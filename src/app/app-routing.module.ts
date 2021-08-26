
import { HomeDetailsProductComponent } from './home-details-product/home-details-product.component';
import { HomeBlogComponent } from './home-blog/home-blog.component';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeDetailsBlogComponent } from './home-details-blog/home-details-blog.component';
import { ProfileComponent } from './profile/profile.component';



const accounts =() => import('./account/account.module').then(x => x.AccountModule);
const products =() => import('./product/product.module').then(x => x.ProductModule);


const routes: Routes = [

   { path: '',component:HomeComponent},
   { path: 'menu',component:MenuComponent},
   { path: 'home-blog',component:HomeBlogComponent},
   { path: 'profile',component:ProfileComponent},
   { path: 'detailsproduct/:id',component:HomeDetailsProductComponent},
   { path: 'detailsblog/:id',component:HomeDetailsBlogComponent},
   


    {path:'account',loadChildren : accounts},
    {path:'product',loadChildren : products},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
