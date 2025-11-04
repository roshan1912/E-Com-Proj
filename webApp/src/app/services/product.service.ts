import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  constructor() {}

  getProducts() {
    return this.http.get(environment.apiUrl + '/product/getAll');
  }

  addProduct(productData: any) {
    return this.http.post(environment.apiUrl + '/product/add', productData);
  }

  deleteProduct(id: any) {
    return this.http.delete(environment.apiUrl + `/product/delete/${id}`);
  }

  getProductById(id: any) {
    return this.http.get(environment.apiUrl + `/product/getBy/${id}`);
  }

  updateProduct(id: any, productData: any) {
    return this.http.put(
      environment.apiUrl + `/product/update/${id}`,
      productData
    );
  }
}
