import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { DialogService } from '../service/dialog-service/dialog.service';
import { NotificationService } from '../service/notification-service/notification.service';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  urlavatar:string;
  user: User;
  role: number;
  emailId: string;

  constructor(private userService : UserService, private _router: Router,
    private route: ActivatedRoute, private dialogService: DialogService, private notificationService: NotificationService) { 
    this.userService.user.subscribe(x => this.user = x);
  this.userService.roleEntity.subscribe(y => this.role = y);
  this.userService.AvatarEntity.subscribe(x => this.urlavatar = x)
  this.emailId = localStorage.getItem("emailId")
  }

  ngOnInit(): void {
    this.userService.getUserByemail(this.user).subscribe(data=>{
      this.user = data;
      this.urlavatar= data?.avatar;
      console.log(data);
    })
    
  }

}
