import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  fb = new FormBuilder();
  productForm: any;
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  isEdit: boolean = false;
  id: any;
  brands: any[] = [];
  categories: any[] = [];
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      purchasePrice: [null, Validators.required],
      sellingPrice: [null, Validators.required],
      images: this.fb.array([]),
      categoryId: [null, Validators.required],
      brandId: [null, Validators.required],
      isFeatured: [false],
      isNewArrival: [false],
    });
    this.brandService.getBrands().subscribe((brands: any) => {
      this.brands = brands;
    });

    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });

    this.addImage();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEdit = true;
        this.patchValue(this.id);
      }
    });
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.fb.control(null));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  patchValue(id: any) {
    this.productService.getProductById(id).subscribe((product: any) => {
      this.productForm.patchValue(product as any);

      //we can do the path in below way also

      // this.productForm.patchValue({
      //   name: product.name,
      //   description: product.description,
      //   purchasePrice: product.purchasePrice,
      //   sellingPrice: product.sellingPrice,
      //   categoryId: product.categoryId ?? null,
      //   brandId: product.brandId ?? null,
      // });

      this.images.clear();
      if (Array.isArray(product.images) && product.images.length) {
        product.images.forEach((img: any) => {
          const url = typeof img === 'string' ? img : img?.url ?? '';
          this.images.push(this.fb.control(url));
        });
      } else {
        this.addImage();
      }
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.productService
        .updateProduct(this.id, this.productForm?.value)
        .subscribe(
          () => this.router.navigate(['/admin/product']),
          (error: any) => console.error('Error updating product:', error)
        );
    } else {
      this.productService.addProduct(this.productForm?.value).subscribe(
        () => this.router.navigate(['/admin/product']),
        (error: any) => console.error('Error adding product:', error)
      );
    }
  }

  goBack() {
    this.router.navigate(['/admin/product']);
  }
}
