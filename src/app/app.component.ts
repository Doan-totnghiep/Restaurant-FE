import { Router } from '@angular/router';
import { UserService } from './service/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { UserModel } from './model/user-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
title = 'Web-food';
user: User;
loginedUser:  UserModel;
role: number;
data: string;
totalRecords: string;
page: number = 1;
searchValue: string;
emailId: string;
imageLocation: string;
urlavatar:string;

constructor(private userService : UserService, private _router: Router) {
  this.userService.user.subscribe(x => this.user = x);
  this.userService.roleEntity.subscribe(y => this.role = y);
  this.userService.AvatarEntity.subscribe(x => this.urlavatar = x)
  this.emailId = localStorage.getItem("emailId")
}
ngOnInit(){
  // this.role = parseInt(localStorage.getItem('role'));
  // if (this.user !== null) {
  //   this.userService.getUserByemail(this.user).subscribe(
  //     data => {
  //       this.user = data
  //       this.urlavatar = "assets/image/" + this.loginedUser?.avatar
  //     }
  //   )
  // }
  this.userService.getUserByemail(this.user).subscribe(data=>{
    this.user = data;
    this.urlavatar=   data?.avatar;
  })
}

logout(){
  this.userService.logout()
}

}

