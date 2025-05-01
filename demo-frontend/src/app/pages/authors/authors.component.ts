import { Component, ElementRef, inject, viewChild } from '@angular/core';

import { GridApi, type ColDef } from 'ag-grid-community';

import { AuthorsService } from '@core/services/authors.service';
import { MatDialog } from '@angular/material/dialog';

import { AuthorFormComponent } from './author-form/author-form.component';
import { type Author } from '@core/models/author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
})
export class AuthorsComponent {
  // DI
  #authorsService = inject(AuthorsService);
  #dialog = inject(MatDialog);
  // LOCAL
  #gridApi!: GridApi;
  filterTextBox = viewChild<ElementRef<HTMLInputElement>>('filterTextBox');
  readonly authors$ = this.#authorsService.authors$;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sort: 'desc' },
    { field: 'nombre', headerName: 'Nombre', sort: 'desc' },
    { field: 'genero', headerName: 'Género', sort: 'desc' },
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
      const id = event.event.target?.dataset?.id as string;
      const author = event.data as Author;
      if (action === 'edit') {
        this.#dialog.open(AuthorFormComponent, {
          data: { author },
          width: '400px',
        });
      }

      if (action === 'delete') {
        this.#authorsService.deleteAuthor(id).subscribe();
      }
    });
    params.api.sizeColumnsToFit();
  }

  openCreateModal() {
    this.#dialog.open(AuthorFormComponent, {
      data: {},
      width: '400px',
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
