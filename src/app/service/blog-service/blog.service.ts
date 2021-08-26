import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogModel } from './../../model/blog-model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogSubject: BehaviorSubject<BlogModel>;

  constructor(private http : HttpClient, private _router:Router, private route: ActivatedRoute) {
  }
   SaveBlog(blogEntity : BlogModel){
    return this.http.post<BlogModel>(`${environment.backend}/blog`,blogEntity);
  }
  GetBlog(){
    return this.http.get<BlogModel[]>(`${environment.backend}/blog`);
  }
  search(searchValue: string){
    return this.http.post<BlogModel[]>(`${environment.backend}/blog-search`, searchValue)
  }
 
  UploadFile(file : File,id){
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<BlogModel>(`${environment.backend}/blog/upload/${id}`,formData);
  }
  GetBlogById(id:number){
    return this.http.get<BlogModel>(`${environment.backend}/blog/${id}`);
  }
  UpdateBlog(blogEntity:BlogModel,id:number){
    return this.http.put<BlogModel>(`${environment.backend}/blog/${id}`, blogEntity);
  }
  DeleteBlog(id:number){
    return this.http.delete<BlogModel>(`${environment.backend}/blog/${id}`);
  }
  public get blogValue(): BlogModel{
    return this.blogSubject.value;
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('emailID');
    localStorage.removeItem('role');
    this.blogSubject.next(null);
    this._router.navigate(['/account/login']);
  }
}
