import { Component, ElementRef, inject, viewChild } from '@angular/core';

import { GridApi, type ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '@core/services/books.service';
import { type Book } from '@core/models/book.interface';
import { BookFormComponent } from './book-form/book-form.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  // DI
  #booksService = inject(BooksService);
  #dialog = inject(MatDialog);
  // LOCAL
  #gridApi!: GridApi;
  filterTextBox = viewChild<ElementRef<HTMLInputElement>>('filterTextBox');
  readonly books$ = this.#booksService.books$;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sort: 'desc' },
    { field: 'titulo', headerName: 'Título', sort: 'desc' },
    { field: 'descripcion', headerName: 'Descripción', sort: 'desc' },
    { field: 'anio', headerName: 'Año', sort: 'desc' },
    { field: 'idAutor', headerName: 'ID Autor', sort: 'desc' },
    { field: 'publicado', headerName: 'Publicado', sort: 'desc' },
    { field: 'fechaRegistro', headerName: 'Fecha Registro', sort: 'desc' },
    {
      headerName: 'Acciones',
      cellRenderer: (params: any) => {
        const id = params.data.id;
        return `
          <button class="custom-material-btn" data-action="edit" data-id="${id}">✏️</button>
          <button class="custom-material-btn" data-action="delete" data-id="${id}">🗑️</button>
        `;
      },
    },
  ];

  onGridReady(params: any) {
    this.#gridApi = params.api;
    params.api.addEventListener('cellClicked', (event: any) => {
      const action = event.event.target?.dataset?.action;
      const id = event.event.target?.dataset?.id;
      const book = event.data as Book;

      if (action === 'edit') {
        this.#dialog.open(BookFormComponent, {
          data: { book },
          width: '500px',
        });
      }

      if (action === 'delete') {
        this.#booksService.deleteBook(id).subscribe();
      }
    });
    params.api.sizeColumnsToFit();
  }

  openCreateModal() {
    this.#dialog.open(BookFormComponent, {
      data: {},
      width: '500px',
    });
  }

  onFilterTextBoxChanged() {
    console.log(this.filterTextBox());
    this.#gridApi.setGridOption(
      'quickFilterText',
      (this.filterTextBox()?.nativeElement as HTMLInputElement).value
    );
  }
}
