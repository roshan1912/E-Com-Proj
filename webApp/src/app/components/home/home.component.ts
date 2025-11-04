import { Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsCardComponent } from '../products-card/products-card.component';
import {
  CarouselModule,
  OwlOptions,
  CarouselComponent,
} from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    ProductsCardComponent,
    CarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('owl', { static: false }) owl?: CarouselComponent;

  router = inject(Router);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
    margin: 10,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  };
  customerService = inject(CustomerService);
  newProducts: any[] = [];
  featuredProducts: any[] = [];
  bannerItems: any[] = [];

  ngOnInit() {
    this.customerService.getNewProducts().subscribe((data: any) => {
      this.newProducts = data;
      this.bannerItems.push(...data);
    });
    this.customerService.getFeaturedProducts().subscribe((data: any) => {
      this.featuredProducts = data;
      this.bannerItems.push(...data);
    });
  }

  prev() {
    this.owl?.prev();
  }

  next() {
    this.owl?.next();
  }

  onProductClick(item: any) {
    this.router.navigate([`/product/${item?._id}`]);
  }
}
