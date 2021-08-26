import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../service/blog-service/blog.service';
import { BlogModel } from './../model/blog-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-details-blog',
  templateUrl: './home-details-blog.component.html',
  styleUrls: ['./home-details-blog.component.css']
})
export class HomeDetailsBlogComponent implements OnInit {
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
        this.imageUrl = "../../assets/image/" + data.avatar;
      })
    }
  }
