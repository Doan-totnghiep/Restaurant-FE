import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/model/order-model';
import { OrderService } from 'src/app/service/order-service/order.service';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  totalRecords:string;
  page: number= 1;
  searchValue:string;
  order: OrderModel[]
  constructor(private orderService : OrderService, private _router :Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.orderService.GetOrder().subscribe(data=>{
      this.order=data.sort((a,b) => b.id - a.id);
      console.log(data);
    })
  }
getAllOrder(){
  this.orderService.GetOrder().subscribe(data=>{
    this.order=data.sort((a,b) => b.id - a.id);
    console.log(data);
  })
}
  UpdateOrder(id:number){
    this._router.navigate(['/product/update-order',id])
  }
  deleteOrder(id:number){
    this.dialogService.openCofirmDialog('Bạn có chắc muốn xóa không ?')
    .afterClosed().subscribe(res => {
      if(res){
this.orderService.DeleteOrder(id).subscribe(data=>{
  this.orderService.GetOrder().subscribe(data=>{
    this.order=data.sort((a,b) => b.id - a.id);
    console.log(data);
    this.notificationService.success('! Xóa thành công');
  })
})
}
});
}
  viewOrder(id:number){
    this._router.navigate(['/product/details-order',id])
  }

  onSearch(){
    console.log(this.searchValue);
    
    if (this.searchValue !== ""){
      this.orderService.search(this.searchValue).subscribe(
        data => {
          this.order = data
        }
      )
    } else{
      this.getAllOrder()
    }
  }
}
