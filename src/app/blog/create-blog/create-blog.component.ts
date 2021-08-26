import { Router } from '@angular/router';
import { BlogService } from './../../service/blog-service/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/model/blog-model';
import { DialogService } from 'src/app/service/dialog-service/dialog.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  blog = new BlogModel();
  selectunit: string;

  OneFile: File = null
    constructor(private _blogService:BlogService, private _roter: Router,
      private dialogService: DialogService, private notificationService: NotificationService) { }

    ngOnInit(): void {

    }
    Selected(event) {
      this.OneFile = event.target.files[0];
    }
    selectUnit (event){
      this.selectunit = event.target.value;
    }
    Submit() {
      this.dialogService.openCofirmDialog('Bạn có chắc muốn thêm tài khoản mới không ?')
      .afterClosed().subscribe(res => {
        if(res){
      const createuserData = {
        content : this.blog.content,
        title  : this.blog.title,
        date : this.blog.date,
        note : this.blog.note,
        contentlong : this.blog.contentlong,
      }
      console.log(createuserData);
    this._blogService.SaveBlog(createuserData).subscribe(data => {
      this._blogService.UploadFile(this.OneFile, data.id).subscribe(data => {
        console.log(data);
        this.goToBlogList();
      })
        this.notificationService.success('! Thêm thành công');
      })
      }
    })
   
}

  goToBlogList() {
      this._roter.navigate(['product/list-blog'])
    }


  }
