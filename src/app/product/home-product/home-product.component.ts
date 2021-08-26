import { ProductService } from './../../service/product/product.service';
import { ProductModel } from 'src/app/model/product-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {
  product:ProductModel[]
  constructor(private _service : ProductService, private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.GetProduct().subscribe(data=>{
      this.product=data
    })
  }
}
