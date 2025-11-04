import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandsFormComponent } from './components/manage/brands-form/brands-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { authGuard } from './core/auth-gaurd';
import { adminGuard } from './core/admin-gaurd';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/category',
    component: CategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/category/add',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/category/add/:id',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand',
    component: BrandsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand/add',
    component: BrandsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand/add/:id',
    component: BrandsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/product',
    component: ProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/product/add',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/product/add/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
