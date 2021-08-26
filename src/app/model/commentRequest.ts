export class CommentRequest{
    id ? :number;
    comment :string;
    userId :{
      id:number;
      avatar?:string;
      user_name?:string;
      name?:string;
    };
    product_id:{
      id:number
    }
    datecomment:Date
  }