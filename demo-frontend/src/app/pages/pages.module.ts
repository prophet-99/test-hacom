import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { SummaryBooksComponent } from './dashboard/components/summary-books/summary-books.component';
import { PublishedBooksComponent } from './dashboard/components/published-books/published-books.component';
import { AuthorGenresComponent } from './dashboard/components/author-genres/author-genres.component';
import { SimulateChartComponent } from './dashboard/components/simulate-chart/simulate-chart.component';

@NgModule({
  declarations: [
    AuthorsComponent,
    BooksComponent,
    DashboardComponent,
    PagesComponent,
    AuthorFormComponent,
    BookFormComponent,
    SummaryBooksComponent,
    PublishedBooksComponent,
    AuthorGenresComponent,
    SimulateChartComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
})
export class PagesModule {}
