import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';
import { RoleModel } from './../../model/roles-model';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new UserModel();
  selectedrole: number=2 ;
  listRole: RoleModel[];
  OneFile : File =null


  constructor(private userService : UserService, private _router: Router,
     private notificationService: NotificationService) { }
 

  ngOnInit(): void {
    this.AddRoles();

     }
  Selected(event){
    this.OneFile = event.target.files[0];
  }
  selectRoles(event){
    this.selectedrole = event.target.value;
  }

  Submit() {
    
        const createuserData = {
          user_name : this.user.user_name,
          name : this.user.name,
          emailId  : this.user.emailId,
          password : this.user.password,
          role_id : this.selectedrole,
  
        }
       
      this.userService.SaveUser(createuserData).subscribe(data => {
        this.userService.UploadFile(this.OneFile, data.id).subscribe(data => {
          console.log(data);
         
          this.goToUserList();
          this.notificationService.success('! Đăng ký thành công');
        })
      
      })
      
    }
   

  goToUserList() {
    this._router.navigate(['/account/login'])
  }
  AddRoles(){
    this.userService.GetRole().subscribe(
      response => {
        this.listRole = response
        // console.log(this.listRole);
      }
    );
  }
  logout() {
    this.userService.logout();
  }
}
