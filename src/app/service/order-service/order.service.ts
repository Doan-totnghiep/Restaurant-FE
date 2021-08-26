import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OrderModel } from './../../model/order-model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderSubject: BehaviorSubject<OrderModel>;

  constructor(private http : HttpClient, private _router:Router, private route: ActivatedRoute) {
  }
   SaveOrder(orderEntity : OrderModel){
    return this.http.post<OrderModel>(`${environment.backend}/order`,orderEntity);
  }
  GetOrder(){
    return this.http.get<OrderModel[]>(`${environment.backend}/order`);
  }
  GetOrderById(id:number){
    return this.http.get<OrderModel>(`${environment.backend}/order/${id}`);
  }
  UpdateOrder(orderEntity:OrderModel,id:number){
    return this.http.put<OrderModel>(`${environment.backend}/order/${id}`, orderEntity);
  }
  search(searchValue: string){
    return this.http.post<OrderModel[]>(`${environment.backend}/order-search`, searchValue)
  }
  DeleteOrder(id:number){
    return this.http.delete<OrderModel>(`${environment.backend}/order/${id}`);
  }
  public get orderValue(): OrderModel{
    return this.orderSubject.value;
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('emailID');
    localStorage.removeItem('role');
    this.orderSubject.next(null);
    this._router.navigate(['/account/login']);
  }
}
