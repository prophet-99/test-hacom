import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AuthorsService } from '@core/services/authors.service';
import { type Author } from '@core/models/author.interface';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styles: `
    .sh-form-container {
      padding: 2rem;
    }
  `,
})
export class AuthorFormComponent {
  // DI
  #fb = inject(FormBuilder);
  #authorsService = inject(AuthorsService);
  #dialogRef: MatDialogRef<AuthorFormComponent> = inject(MatDialogRef);
  // LOCAL
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { author?: Author }) {
    this.form = this.#fb.group({
      id: [data?.author?.id ?? null],
      nombre: [data?.author?.nombre ?? ''],
      genero: [data?.author?.genero ?? ''],
    });
  }

  submit() {
    const value = this.form.value;

    if (value.id == null) {
      this.#authorsService
        .addAuthor({ nombre: value.nombre, genero: value.genero })
        .subscribe(() => {
          this.#dialogRef.close();
        });
    } else {
      this.#authorsService
        .updateAuthor(value.id, { nombre: value.nombre, genero: value.genero })
        .subscribe(() => {
          this.#dialogRef.close();
        });
    }
  }

  cancel() {
    this.#dialogRef.close();
  }
}
