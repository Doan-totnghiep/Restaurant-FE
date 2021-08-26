import { ProductResponse } from './../../model/product_response';
import { ServicesModel } from './../../model/services-model';
import { environment } from './../../../environments/environment.prod';
import { ProductModel } from './../../model/product-model';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentRequest } from './../../model/commentRequest';
import { Comments } from './../../model/comment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject: BehaviorSubject<ProductModel>;

  constructor(private http : HttpClient, private _router:Router, private route: ActivatedRoute) {
  }
   SaveProduct(productEntity : ProductModel){
    return this.http.post<ProductModel>(`${environment.backend}/product`,productEntity);
  }
  GetProduct(){
    return this.http.get<ProductModel[]>(`${environment.backend}/product`);
  }

  GetService(){
    return this.http.get<ServicesModel[]>(`${environment.backend}/services`);
  }
  search(searchValue: string){
    return this.http.post<ProductModel[]>(`${environment.backend}/product-search`, searchValue)
  }

  GetProductByService(service_id:number){
    return this.http.get<ProductModel[]>(`${environment.backend}/product/services?service_id=${service_id}`);
  }

  UploadFile(file : File,id){
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<ProductModel>(`${environment.backend}/product/upload/${id}`,formData);
  }
  GetProductById(id:number){
    return this.http.get<ProductResponse>(`${environment.backend}/product/${id}`);
  }
  UpdateProduct(productEntity:ProductModel,id:number){
    return this.http.put<ProductModel>(`${environment.backend}/product/${id}`, productEntity);
  }
  DeleteProduct(id:number){
    return this.http.delete<ProductModel>(`${environment.backend}/product/${id}`);
  }
  public get productValue(): ProductModel{
    return this.productSubject.value;
  }

  AddComment(commentEntity:Comments){
    return this.http.post<Comments>(`${environment.backend}/comment`,commentEntity);
  }
  
  GetComment(){
    return this.http.get<CommentRequest[]>(`${environment.backend}/comment`);
  }
  //hien thi comment theo bai viet
  GetCommentByProductId(product_id:number){
   return this.http.get<CommentRequest[]>(`${environment.backend}/comment-byproduct?product_id=${product_id}`);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('emailID');
    localStorage.removeItem('role');
    this.productSubject.next(null);
    this._router.navigate(['/account/login']);
  }
}
