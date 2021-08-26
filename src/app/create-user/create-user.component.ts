import { UserService } from './../service/user-service/user.service';
import { UserModel } from './../model/user-model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RoleModel } from './../model/roles-model';
import { Router } from '@angular/router';
import { DialogService } from '../service/dialog-service/dialog.service';
import { NotificationService } from '../service/notification-service/notification.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user = new UserModel();
  selectedrole: number;
  listRole:RoleModel[];
  OneFile: File = null
    constructor(private _userService:UserService,private _router: Router,
      private dialogService: DialogService, private notificationService: NotificationService) { }

    ngOnInit(): void {
      this.ListRoles();
    }
    Selected(event) {
      this.OneFile = event.target.files[0];
    }
    selectRoles (event){
      this.selectedrole = event.target.value;
    }
    Submit() {
      this.dialogService.openCofirmDialog('Bạn có chắc muốn thêm tài khoản mới không ?')
      .afterClosed().subscribe(res => {
        if(res){
          const createuserData = {
            user_name : this.user.user_name,
            name : this.user.name,
            emailId  : this.user.emailId,
            password : this.user.password,
            role_id : this.selectedrole,
    
          }
         
        this._userService.SaveUser(createuserData).subscribe(data => {
          this._userService.UploadFile(this.OneFile, data.id).subscribe(data => {
            console.log(data);
           
            this.goToUserList();
           
          })
          this.notificationService.success('! Thêm thành công');
        })
        }
      })
     
  }
 
    goToUserList() {
      this._router.navigate(['/product/list-user'])
    }
    ListRoles(){
      this._userService.GetRole().subscribe(
        response => {
          this.listRole = response
        }
      );
    }

  }


