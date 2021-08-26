import { ProductResponse } from './../../model/product_response';
import { ProductService } from './../../service/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/model/product-model';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  id :number;
 
  
  product:ProductResponse
  imageUrl: string;
    constructor(private _serviceProduct : ProductService,
      private _router : ActivatedRoute,
      private router:Router) { }

    ngOnInit(): void {
      this.id=this._router.snapshot.params['id'];
      this.product =new ProductResponse();
      this._serviceProduct.GetProductById(this.id).subscribe(data=>{
        this.product=data;
        this.imageUrl = "../assets/image/" + data.avatar;
      })
    }
   
  }
