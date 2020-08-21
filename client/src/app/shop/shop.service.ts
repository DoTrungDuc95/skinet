import { IType } from './../shared/models/type';
import { IBrand } from './../shared/models/brand';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParam: ShopParams) {
    let params = new HttpParams();
    if (shopParam.bId !== 0) {
      params = params.append('brandId', shopParam.bId.toString());
    }
    if (shopParam.tId !== 0) {
      params = params.append('typeId', shopParam.tId.toString());
    }
    if (shopParam.search) {
      params = params.append('search', shopParam.search);
    }
    params = params.append('sort', shopParam.sort);
    params = params.append('pageIndex', shopParam.pageNumber.toString());
    params = params.append('pageSize', shopParam.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', {
      observe: 'response',
      params,
    });
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
