import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'purchasePrice',
    'sellingPrice',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);
  router = inject(Router);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.productService.getProducts().subscribe((products: any) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(row: any) {
    this.productService.deleteProduct(row._id).subscribe(
      (response: any) => {
        console.log(response);
        this.getData();
      },
      (error: any) => {
        console.error('Error deleting Product:', error);
      }
    );
  }

  onEdit(row: any) {
    // Navigate to edit form with the category ID
    console.log('Edit Product with ID:', row._id);
    this.router.navigateByUrl(`/admin/product/add/${row._id}`);
  }
}
