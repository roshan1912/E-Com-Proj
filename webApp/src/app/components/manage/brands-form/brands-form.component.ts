import { Component, inject } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brands-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss'],
})
export class BrandsFormComponent {
  fb = new FormBuilder();
  brandForm: any;
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor() {}
  isEdit: boolean = false;

  brandService = inject(BrandService);
  id: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.patchValue(this.id);
      this.isEdit = true;
    }
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  patchValue(id: any) {
    this.brandService.getBrandById(id).subscribe((brand: any) => {
      this.brandForm.patchValue({
        name: brand.name,
      });
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.brandService
        .updateBrand(this.id, this.brandForm?.value?.name)
        .subscribe(
          (response: any) => {
            this.router.navigate(['/admin/brand']);
          },
          (error: any) => {
            console.error('Error updating brand:', error);
          }
        );
    } else {
      this.brandService.addBrand(this.brandForm.value.name).subscribe(
        (response: any) => {
          this.router.navigate(['/admin/brand']);
        },
        (error: any) => {
          console.error('Error adding brand:', error);
        }
      );
    }
  }
}
