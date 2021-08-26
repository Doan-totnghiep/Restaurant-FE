import { UserService } from './../service/user-service/user.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';




@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  role: number;
  constructor(
    private _router: Router,
    private _service: UserService,

  ) { this._service.roleEntity.subscribe(x => this.role = x); }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._service.userValue && this.role == 1;
    if (user) {
      // được ủy quyền nên trả về true
      return true;
    }else{
      this._router.navigate([''], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // chưa đăng nhập nên chuyển hướng đến trang đăng nhập với url trả về
   
  }
}
