import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { type Book } from '@core/models/book.interface';
import { bookAdapter } from '@core/adapters/book-adapter';

const STORAGE_KEY = 'books-cache';

@Injectable({ providedIn: 'root' })
export class BooksService {
  // DI
  #http = inject(HttpClient);
  // LOCAL
  apiURL = `${environment.API_URL}/book`;
  #booksSubject = new BehaviorSubject<void>(undefined);
  books$: Observable<Book[]> = this.#booksSubject.pipe(
    switchMap(() => {
      const cache = localStorage.getItem(STORAGE_KEY);
      return cache
        ? of(JSON.parse(cache))
        : this.#http.get<Book[]>(this.apiURL).pipe(
            map((books) => books.map(bookAdapter)),
            tap((adapted) =>
              localStorage.setItem(STORAGE_KEY, JSON.stringify(adapted))
            )
          );
    })
  );

  addBook(book: Omit<Book, 'id'>) {
    const {
      titulo: title,
      descripcion: description,
      anio: year,
      idAutor: autorId,
      publicado: published,
      fechaRegistro: createDate,
    } = book;
    const mappedBook = {
      title,
      description,
      year,
      autorId,
      published,
      createDate,
    };

    return this.#http.post<Book>(this.apiURL, mappedBook).pipe(
      tap(() => {
        localStorage.removeItem(STORAGE_KEY);
        this.#booksSubject.next();
      })
    );
  }

  updateBook(id: string, book: Omit<Book, 'id'>) {
    const {
      titulo: title,
      descripcion: description,
      anio: year,
      idAutor: autorId,
      publicado: published,
      fechaRegistro: createDate,
    } = book;
    const mappedBook = {
      title,
      description,
      year,
      autorId,
      published,
      createDate,
    };
    return this.#http.put<Book>(`${this.apiURL}/${id}`, mappedBook).pipe(
      tap(() => {
        localStorage.removeItem(STORAGE_KEY);
        this.#booksSubject.next();
      })
    );
  }

  deleteBook(id: string) {
    return this.#http.delete(`${this.apiURL}/${id}`).pipe(
      tap(() => {
        localStorage.removeItem(STORAGE_KEY);
        this.#booksSubject.next();
      })
    );
  }
}
