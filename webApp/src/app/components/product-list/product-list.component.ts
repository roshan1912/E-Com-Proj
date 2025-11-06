import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
})
export class ProductListComponent {
  products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
    price: (Math.random() * 50 + 10).toFixed(2),
    image: `https://picsum.photos/300/200?random=${i + 1}`,
  }));
}
