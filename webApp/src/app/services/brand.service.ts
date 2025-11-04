import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  http = inject(HttpClient);

  constructor() {}

  getBrands() {
    return this.http.get(environment.apiUrl+'/brand');
  }

  addBrand(name: any) {
    return this.http.post(environment.apiUrl+'/brand', { name });
  }

  deleteBrand(id: any) {
    return this.http.delete(environment.apiUrl+`/brand/${id}`);
  }

  getBrandById(id: any) {
    return this.http.get(environment.apiUrl+`/brand/${id}`);
  }

  updateBrand(id: any, name: any) {
    return this.http.put(environment.apiUrl+`/brand/${id}`, { name });
  }
}
