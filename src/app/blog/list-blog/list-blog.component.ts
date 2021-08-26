import { BlogService } from './../../service/blog-service/blog.service';
import { Router } from '@angular/router';
import { BlogModel } from './../../model/blog-model';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {
  totalRecords:string;
  page: number= 1;
  searchValue:string;
  blog: BlogModel[]
  constructor(private blogService : BlogService, private _router :Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.blogService.GetBlog().subscribe(data=>{
      this.blog=data.sort((a,b) => b.id - a.id);
      console.log(data);
    })
  }
  getAllBlog(){
    this.blogService.GetBlog().subscribe(data=>{
      this.blog=data.sort((a,b) => b.id - a.id);
      console.log(data);
    })
  }
  UpdateBlog(id:number){
    this._router.navigate(['/product/update-blog',id])

  }
  deleteBlog(id:number){
    this.dialogService.openCofirmDialog('Bạn có chắc muốn xóa không ?')
    .afterClosed().subscribe(res => {
      if(res){
this.blogService.DeleteBlog(id).subscribe(data=>{
  this.blogService.GetBlog().subscribe(data=>{
    this.blog=data.sort((a,b) => b.id - a.id);
    console.log(data);
    this.notificationService.success('! Xóa thành công');
  })
})
}
});
}
  viewBlog(id:number){
    this._router.navigate(['/product/view-blog',id])
  }

  onSearch(){
    console.log(this.searchValue);
    
    if (this.searchValue !== ""){
      this.blogService.search(this.searchValue).subscribe(
        data => {
          this.blog = data
        }
      )
    } else{
      this.getAllBlog()
    }
  }
}
