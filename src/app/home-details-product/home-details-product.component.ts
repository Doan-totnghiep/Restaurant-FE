import { ProductResponse } from './../model/product_response';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../service/product/product.service';
import { ProductModel } from './../model/product-model';
import { Component, OnInit } from '@angular/core';
import { CommentRequest } from './../model/commentRequest';
import { Comments } from './../model/comment';
@Component({
  selector: 'app-home-details-product',
  templateUrl: './home-details-product.component.html',
  styleUrls: ['./home-details-product.component.css']
})
export class HomeDetailsProductComponent implements OnInit {
  id :number;
  totalRecords:string;
  page: number= 1;
  searchValue:string;
  
  product:ProductResponse
  comment1=new Comments();
  comments: CommentRequest[];
  EmailId : string;
  imageUrl: string;
    constructor(private _serviceProduct : ProductService,
      private _router : ActivatedRoute) { }

    ngOnInit(): void {
      this.id=this._router.snapshot.params['id'];
      this.product =new ProductResponse();
      this._serviceProduct.GetProductById(this.id).subscribe(data=>{
        this.product=data;
        this.imageUrl = "../assets/image/" + data.avatar;
      })
      this.ListComment()
      this.EmailId = localStorage.getItem('emailID');
    }
    Submit(){
      const createProductData ={
        comment: this.comment1.comment,
        email: this.EmailId.split("\"")[1],
        product_id:this.id
      }
  
  this._serviceProduct.AddComment(createProductData).subscribe(data=>{
  this.ListComment()
  this.comment1.comment ="";
  })
    }
  
    ListComment(){
  this._serviceProduct.GetCommentByProductId(this.id).subscribe(data=>{
    this.comments=data.sort((a,b) => b.id - a.id)
  })
    }
    
  }
