import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  fb = new FormBuilder();
  categoryForm: any;
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor() {}
  isEdit: boolean = false;

  catService = inject(CategoryService);
  id: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.patchValue(this.id);
      this.isEdit = true;
    }
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  patchValue(id: any) {
    this.catService.getCategoryById(id).subscribe((category: any) => {
      this.categoryForm.patchValue({
        name: category.name,
      });
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.catService
        .updateCategory(this.id, this.categoryForm?.value?.name)
        .subscribe(
          (response: any) => {
            this.router.navigate(['/admin/category']);
          },
          (error: any) => {
            console.error('Error adding category:', error);
          }
        );
    } else {
      this.catService.addCategory(this.categoryForm.value.name).subscribe(
        (response: any) => {
          this.router.navigate(['/admin/category']);
        },
        (error: any) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }
}
