import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Route, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
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
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  catService = inject(CategoryService);
  router = inject(Router);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.catService.getCategories().subscribe((categories: any) => {
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
    this.catService.onDelete(row._id).subscribe(
      (response: any) => {
        console.log(response);
        this.getData();
      },
      (error: any) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  onEdit(row: any) {
    // Navigate to edit form with the category ID
    console.log('Edit category with ID:', row._id);
    this.router.navigateByUrl(`/admin/category/add/${row._id}`);
  }
}
