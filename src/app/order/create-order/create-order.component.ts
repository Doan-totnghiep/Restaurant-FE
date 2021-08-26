import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/model/order-model';
import { OrderService } from 'src/app/service/order-service/order.service';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  order = new OrderModel();
  selecthour: string;
  selectperson: string;
  selectth: string;
  OneFile: File = null
    constructor(private _orderService:OrderService, private _router: Router,
      private dialogService: DialogService, private notificationService: NotificationService) { }

    ngOnInit(): void {

    }
    Selected(event) {
      this.OneFile = event.target.files[0];
    }

 selectHour (event){
      this.selecthour = event.target.value;
    }
    selectPerson (event){
      this.selectperson = event.target.value;
    }
    selectTh (event){
      this.selectth = event.target.value;
    }
    Submit() {
      this.dialogService.openCofirmDialog('Bạn có chắc muốn thêm tài khoản mới không ?')
      .afterClosed().subscribe(res => {
        if(res){
      const createorderData = {
        fullname : this.order.fullname,
        date  : this.order.date,
        hour : this.selecthour,
        person : this.selectperson,
        phonenumber : this.order.phonenumber,
        th : this.selectth,

      }
      console.log(createorderData);
    this._orderService.SaveOrder(createorderData).subscribe(data => {

        console.log(data);
        this.goToProductList();
      })
      this.notificationService.success('! Thêm thành công');
    }
  })
    }


  goToProductList() {
      this._router.navigate(['product/list-order'])
    }


  }
