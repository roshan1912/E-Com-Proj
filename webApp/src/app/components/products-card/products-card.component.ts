import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss',
})
export class ProductsCardComponent {
  @Input() productList: any[] = [];

  router = inject(Router);

  onCardDeatils(product: any) {
    this.router.navigate([`/product/${product?._id}`]);
  }

  onAddToCart(product: any) {
    console.log('Add to cart clicked:', product);
  }

  onBuyNow(product: any) {
    console.log('Buy now clicked:', product);
  }
}
