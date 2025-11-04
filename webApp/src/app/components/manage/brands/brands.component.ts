import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brands',
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
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
    displayedColumns: string[] = ['id', 'name', 'actions'];
    dataSource: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    brandService = inject(BrandService);
    router = inject(Router);
  
    constructor() {
      this.dataSource = new MatTableDataSource([] as any);
    }
  
    ngOnInit() {
      this.getData();
    }
  
    getData() {
      this.brandService.getBrands().subscribe((categories: any) => {
        this.dataSource.data = categories;
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
      this.brandService.deleteBrand(row._id).subscribe(
        (response: any) => {
          console.log(response);
          this.getData();
        },
        (error: any) => {
          console.error('Error deleting brand:', error);
        }
      );
    }
  
    onEdit(row: any) {
      // Navigate to edit form with the category ID
      console.log('Edit brand with ID:', row._id);
      this.router.navigateByUrl(`/admin/brand/add/${row._id}`);
    }
}
