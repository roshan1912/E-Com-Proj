import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  constructor() {}

  getCategories() {
    return this.http.get(environment.apiUrl+'/category/getAll');
  }

  addCategory(name: any) {
    return this.http.post(environment.apiUrl+'/category/add', { name });
  }

  onDelete(id: any) {
    return this.http.delete(environment.apiUrl+`/category/delete/${id}`);
  }

  getCategoryById(id: any) {
    return this.http.get(environment.apiUrl+`/category/getBy/${id}`);
  }

  updateCategory(id: any, name: any) {
    return this.http.put(environment.apiUrl+`/category/update/${id}`, { name });
  }
}
