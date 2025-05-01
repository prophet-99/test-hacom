import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from '@core/models/author.interface';
import { Book } from '@core/models/book.interface';
import { AuthorsService } from '@core/services/authors.service';
import { BooksService } from '@core/services/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styles: `
    .sh-form-container {
      padding: 2rem;
    }
  `,
})
export class BookFormComponent {
  // DI
  #fb = inject(FormBuilder);
  #booksService = inject(BooksService);
  #authorsService = inject(AuthorsService);
  #dialogRef: MatDialogRef<BookFormComponent> = inject(MatDialogRef);
  // LOCAL
  form: FormGroup;
  authors$: Observable<Author[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { book?: Book }) {
    this.authors$ = this.#authorsService.authors$;

    this.form = this.#fb.group({
      id: [data?.book?.id ?? null],
      titulo: [data?.book?.titulo ?? ''],
      descripcion: [data?.book?.descripcion ?? ''],
      anio: [data?.book?.anio ?? ''],
      idAutor: [data?.book?.idAutor ?? ''],
      publicado: [data?.book?.publicado === 'true'],
      fechaRegistro: [
        data?.book?.fechaRegistro ? new Date(data.book.fechaRegistro) : null,
      ],
    });
  }

  submit() {
    const value = this.form.value;

    const payload: Omit<Book, 'id'> = {
      titulo: value.titulo,
      descripcion: value.descripcion,
      anio: value.anio.toString(),
      idAutor: value.idAutor,
      publicado: value.publicado ? 'true' : 'false',
      fechaRegistro:
        value.fechaRegistro?.toISOString() ?? new Date().toISOString(),
    };

    if (!value.id) {
      this.#booksService
        .addBook(payload)
        .subscribe(() => this.#dialogRef.close());
    } else {
      this.#booksService
        .updateBook(value.id, payload)
        .subscribe(() => this.#dialogRef.close());
    }
  }

  cancel() {
    this.#dialogRef.close();
  }
}
