import { ShopParams } from './../shared/models/shopParams';
import { IType } from './../shared/models/type';
import { IBrand } from './../shared/models/brand';
import { ShopService } from './shop.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParam = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  @ViewChild('search', { static: true }) searchTerm: ElementRef;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParam).subscribe(
      (p) => {
        this.products = p.body.data;
        this.shopParam.pageSize = p.body.pageSize;
        this.shopParam.pageNumber = p.body.pageIndex;
        this.totalCount = p.body.count;
      },
      (err) => console.log(err)
    );
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe(
      (p) => (this.brands = [{ id: 0, name: 'All' }, ...p]),
      (err) => console.log(err)
    );
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe(
      (p) => (this.types = [{ id: 0, name: 'All' }, ...p]),
      (err) => console.log(err)
    );
  }

  onBrandSelected(id: number) {
    this.shopParam.bId = id;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(id: number) {
    this.shopParam.tId = id;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParam.sort = sort;
    this.getProducts();
  }

  onPageChanged(e: any) {
    if (this.shopParam.pageNumber !== e) {
      this.shopParam.pageNumber = e;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParam.search = this.searchTerm.nativeElement.value;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = null;
    this.shopParam.search = null;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }
}
