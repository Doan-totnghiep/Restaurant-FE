import { BlogService } from './../service/blog-service/blog.service';
import { BlogModel } from 'src/app/model/blog-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.css']
})
export class HomeBlogComponent implements OnInit {
  totalRecords:string;
  page: number= 1;
  searchValue:string;
  blog:BlogModel[]
  constructor(private blogService : BlogService,) { }

  ngOnInit(): void {
    this.blogService.GetBlog().subscribe(data=>{
      this.blog=data
    })

  }
}
