import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  // router = inject(Router);

  constructor(private router: Router) {}

  ngOnInit() {}

  goToproducts() {
    this.router.navigate(['/admin/product']);
  }

  goToCategories() {
    this.router.navigate(['/admin/category']);
  }

  goToBrands() {
    this.router.navigate(['/admin/brand']);
  }
}
