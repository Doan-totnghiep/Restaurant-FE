import { UserModel } from './../model/user-model';
import { UserService } from './../service/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '../service/dialog-service/dialog.service';
import { NotificationService } from '../service/notification-service/notification.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  user: UserModel[]
  totalRecords: string;
  page: number = 1;
  searchValue: string;
  constructor(private userService: UserService, private _router: Router, private _service: UserService,
              private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser(){
    this.userService.GetUser().subscribe(data => {
      this.user = data.sort((a, b) => b.id - a.id);
      console.log(data);
    })
  }

  UpdateUser(id: number) {
    this._router.navigate(['/product/user', id])
  }
 
  viewuser(id: number) {
    this._router.navigate(['/product/view-user', id])
  }
  logout() {
    this._service.logout();
  }

  onSearch(){
    console.log(this.searchValue);
    
    if (this.searchValue !== ""){
      this.userService.search(this.searchValue).subscribe(
        data => {
          this.user = data
        }
      )
    } else{
      this.getAllUser()
    }
  }

  deleteUser(id: number){
    this.dialogService.openCofirmDialog('Bạn có chắc muốn xóa không ?')
    .afterClosed().subscribe(res => {
      if(res){
        this.userService.DeleteUser(id).subscribe(data => {
          this.userService.GetUser().subscribe(data => {
            this.user = data.sort((a, b) => b.id - a.id);
            console.log(data);
            this.notificationService.success('! Xóa thành công');
          })
        })
      }
    });
  }
}
