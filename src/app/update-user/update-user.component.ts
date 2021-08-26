import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../service/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { UserModel } from '../model/user-model';
import { pluck } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RoleModel } from '../model/roles-model';
import { DialogService } from '../service/dialog-service/dialog.service';
import { NotificationService } from '../service/notification-service/notification.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private UserService: UserService,private route: ActivatedRoute, private _router: Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }
OneFile : File=null
formUser: any;
listRole:RoleModel[];
user: UserModel=new UserModel();
url : string;
role:number;
id:number;

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id')
    ).subscribe(id=>{
      this.UserService.GetUserById(id).subscribe(data=>{
        this.formUser = new FormGroup({
          id: new FormControl(data.id),
          user_name:new FormControl(data.user_name),
          password : new FormControl(data.password),
          avatar: new FormControl(data.avatar),
          name :new FormControl(data.name),
          emailId: new FormControl(data.emailId),
          role_id :new  FormControl(data.role_id.id),
        })
        this.url = data.avatar;
       
      })

    })
    this.ListRoles();
  }
  
      Selected(event){
        this.OneFile=event.target.files[0];
      }
      Submit(){
        this.dialogService.openCofirmDialog('Bạn có chắc muốn cập nhật không ?')
        .afterClosed().subscribe(res => {
          if(res){
            this.UserService.UpdateUser(this.formUser.value,this.formUser.value.id) .subscribe(data =>{
              if(this.OneFile != null){
                this.UserService.UploadFile(this.OneFile,data.id).subscribe(data =>{
                  console.log(data);
                 
                })
              }
              this.goToUserList();
              this.notificationService.success('! Cập nhật thành công');
            })
          }
        })
       
      }
     
     
      
      goToUserList(){
        this._router.navigate(['/product/list-user'])
      }
      
      ListRoles(){
        this.UserService.GetRole().subscribe(
          response => {
            this.listRole = response
          }
        );
      }
}


