import { FormGroup, FormControl } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './../../service/blog-service/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/model/blog-model';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {

  constructor(private BlogService: BlogService,private route: ActivatedRoute, private _router: Router,
    private dialogService: DialogService, private notificationService: NotificationService) { }
OneFile : File=null
formBlog: any;
blog: BlogModel=new BlogModel();
url : string;
id:number;
  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id')
    ).subscribe(id=>{
      this.BlogService.GetBlogById(id).subscribe(data=>{
        this.formBlog = new FormGroup({
          id: new FormControl(data.id),
          title:new FormControl(data.title),
          avatar: new FormControl(data.avatar),
          content: new FormControl(data.content),
          note: new FormControl(data.note),
          contentlong: new FormControl(data.contentlong),
          })
        this.url = data.avatar;
      })

    })
  }
      Selected(event){
        this.OneFile=event.target.files[0];
      }

      Submit(){
        this.dialogService.openCofirmDialog('Bạn có chắc muốn cập nhật không ?')
        .afterClosed().subscribe(res => {
          if(res){
        this.BlogService.UpdateBlog(this.formBlog.value,this.formBlog.value.id) .subscribe(data =>{
          if(this.OneFile != null){
            this.BlogService.UploadFile(this.OneFile,data.id).subscribe(data =>{
              console.log(data);
            })
          }
          this.goToBlogList();
          this.notificationService.success('! Cập nhật thành công');
        })
      }
    })
   
  }
      goToBlogList(){
        this._router.navigate(['/product/list-blog'])
      }

}
