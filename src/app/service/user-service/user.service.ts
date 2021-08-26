import { ProductModel } from 'src/app/model/product-model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from './../../model/user-model';
import { User } from './../../model/user';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleModel } from './../../model/roles-model';
import { environment } from './../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;

  
  public user: Observable<User>;
  public roleEntity: Observable<number>;
  private AvatarSubject: BehaviorSubject<string>;
  public AvatarEntity: Observable<string>;
  public userEntity: Observable<User>;
  private roleSubject: BehaviorSubject<number>;
  // public userEntity: Observable<UserModel>;
  constructor(private http : HttpClient, private _router:Router, private route: ActivatedRoute) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('emailID')));
    this.roleSubject = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('role')) );
    this.AvatarSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('avatar')) );


    this.user = this.userSubject.asObservable();
    // this.userEntity = this.userSubject.asObservable();
    this.roleEntity = this.roleSubject.asObservable();
    this.AvatarEntity = this.AvatarSubject.asObservable();
   }

  GetProduct(){
    return this.http.get<ProductModel[]>(`${environment.backend}/product`);
  }

  GetProductById(id:number){
    return this.http.get<ProductModel>(`${environment.backend}/product/${id}`);
  }

  search(searchValue: string){
    return this.http.post<UserModel[]>(`${environment.backend}/user-search`, searchValue)
  }

  getUserByemail(emailId: User){
    return this.http.get<User>(`${environment.backend}/user-email/${emailId}`);
  }

  SaveUser(userEntity : UserModel){
    return this.http.post<UserModel>(`${environment.backend}/user`,userEntity);
  }

  GetUser(){
    return this.http.get<UserModel[]>(`${environment.backend}/user`);
  }
  GetRole(){
    return this.http.get<RoleModel[]>(`${environment.backend}/roles`);
  }
  // GetUserById(id:number){
  //   return this.http.get<User>(`${environment.backend}/user/${id}`);
  // }
  UploadFile(file : File,id){
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<UserModel>(`${environment.backend}/user/upload/${id}`,formData);
  }
  GetUserById(id:number){
    return this.http.get<User>(`${environment.backend}/user/${id}`);
  }
  UpdateUser(userEntity:UserModel,id:number){
    return this.http.put<UserModel>(`${environment.backend}/user/${id}`, userEntity);
  }
  DeleteUser(id:number){
    return this.http.delete<UserModel>(`${environment.backend}/user/${id}`);
  }

  LoginUser(userEntity:UserModel){
    return this.http.post<User>(`${environment.backend}/login`,userEntity)
    .pipe(map(userEntity => {
      this.userSubject.next(userEntity);
      this.roleSubject.next(userEntity.role_id.id);
      this.AvatarSubject.next(userEntity.avatar);
     return userEntity;
  }));
  }

  public get userValue(): User{
    return this.userSubject.value;
  }


logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('emailID');
  localStorage.removeItem('role');
  localStorage.removeItem('avatar');
  this.userSubject.next(null);
  this._router.navigate(['/account/login']);
}
}
