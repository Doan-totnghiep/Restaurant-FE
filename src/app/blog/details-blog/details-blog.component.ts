import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../service/blog-service/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/model/blog-model';

@Component({
  selector: 'app-details-blog',
  templateUrl: './details-blog.component.html',
  styleUrls: ['./details-blog.component.css']
})
export class DetailsBlogComponent implements OnInit {
  id :number;
  blog:BlogModel;
  imageUrl: string;
    constructor(private _serviceBlog : BlogService,
      private _router : ActivatedRoute) { }

    ngOnInit(): void {
      this.id=this._router.snapshot.params['id'];
      this.blog =new BlogModel();
      this._serviceBlog.GetBlogById(this.id).subscribe(data=>{
        this.blog=data;
        this.imageUrl = "../assets/image/" + data.avatar;
      })
    }
  }
