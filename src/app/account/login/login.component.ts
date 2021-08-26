import { UserService } from '../../service/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new UserModel();
  msg='';
  constructor(private _uerservice : UserService, private _router : Router ) {
     // redirect to home if already logged in
     if (this._uerservice.userValue) {
      this._router.navigate(['/product/list-user']);
     }
   }

  ngOnInit(): void {

  }

  loginUser(){
    this._uerservice.LoginUser(this.user).subscribe(
      
      data => {
        this._router.navigate(['/product/list-user']);
        console.log("reponse recieved")
      
        if ( typeof(Storage) !== "undefined") {
          localStorage.setItem('emailID', JSON.stringify(this.user.emailId));
          localStorage.setItem('role', JSON.stringify(data.role_id.id));
          localStorage.setItem('avatar', JSON.stringify(data.avatar));

       } else {
              alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
         }
        },
      error => {
        console.log("exception occure")
        this.msg="Bad credentials, please enter valid emailid and password";

    }
    )
  }

}
