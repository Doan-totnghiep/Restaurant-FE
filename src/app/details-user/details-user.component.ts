import { UserService } from './../service/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user-model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  id :number;
  user:User;
  imageUrl: string;
    constructor(private _serviceUser : UserService,
      private _router : ActivatedRoute) { }

    ngOnInit(): void {
      this.id=this._router.snapshot.params['id'];
      this.user =new User();
      this._serviceUser.GetUserById(this.id).subscribe(data=>{
        this.user=data;
        this.imageUrl = "../assets/image/" + data.avatar;
      })
    }

  }
