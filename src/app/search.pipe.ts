import { ProductModel } from './model/product-model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Product: ProductModel[],searchValue:string): ProductModel[] {


  if(!Product || !searchValue){
    return Product;
  }
  return  Product.filter(product =>
    product.food_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
    product.unit.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    product.content.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
    product.price.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );
}
}
