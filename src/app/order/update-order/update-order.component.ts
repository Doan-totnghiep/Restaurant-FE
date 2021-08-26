import { pluck } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order-service/order.service';
import { OrderModel } from 'src/app/model/order-model';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  constructor(private OrderService: OrderService,private route: ActivatedRoute, private _router: Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }
OneFile : File=null
formOrder: any;

order: OrderModel=new OrderModel();
url : string;
id:number;
selectunit: string;
  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id')
    ).subscribe(id=>{
      this.OrderService.GetOrderById(id).subscribe(data=>{
        this.formOrder = new FormGroup({
          id: new FormControl(data.id),
          fullname:new FormControl(data.fullname),
          date : new FormControl(data.date),
          th: new FormControl(data.th),
          hour :new FormControl(data.hour),
          person: new FormControl(data.person),
          phonenumber: new FormControl(data.phonenumber),

        })

      })

    })
  }

      Submit(){
        this.dialogService.openCofirmDialog('Bạn có chắc muốn cập nhật không ?')
        .afterClosed().subscribe(res => {
          if(res){
        this.OrderService.UpdateOrder(this.formOrder.value,this.formOrder.value.id) .subscribe(data =>{

          this.goToOrderList();
          this.notificationService.success('! Cập nhật thành công');
        })
      }
      })
      
    }
      goToOrderList(){
        this._router.navigate(['/product/list-order'])
      }

}
