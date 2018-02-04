import { Component, OnInit } from "@angular/core";
import { IProduct } from "products/product";
import { ProductService } from "products/product.service"

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  
  _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = (this.listFilter ?
      this.performFilter(this.listFilter) :
      this.products);
  }

  filteredProducts: IProduct[];

  products: IProduct[] = [];

  constructor(private _productService: ProductService) {
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct)=>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
  }

  onRatingClicked(value: string): void {
    console.log(value);
    this.pageTitle = "Product List: " + value;
  }

  ngOnInit() : void {
    this._productService.getProducts()
          .subscribe(products => {
              this.products = products;
              this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error);
  }

  toggleImage() : void {
    this.showImage = !this.showImage;
  }
}
