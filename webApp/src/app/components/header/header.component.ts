import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  categoryService = inject(CustomerService);
  authService = inject(AuthService);
  router = inject(Router);
  searchText!: string;

  categoryList: any[] = [];

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.categoryService.getCategories().subscribe((categories: any) => {
          this.categoryList = categories;
        });
      } else {
        this.categoryList = [];
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/admin']);
  }

  onShopLogoClick() {
    this.router.navigate(['/']);
  }

  onSearch(event: any) {
    if (event?.target?.value) {
      this.router.navigateByUrl('/products?search=' + event?.target?.value);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  onSearchCategory(id: any) {
    this.searchText = '';
    if (id) {
      this.router.navigateByUrl('/products?category=' + id);
    }
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
