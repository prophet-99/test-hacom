import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';

import { type Author } from '@core/models/author.interface';
import { environment } from 'src/environments/environment.development';
import { authorAdapter } from '@core/adapters/author-adapter';

const STORAGE_KEY = 'authors-cache';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  // DI
  #http = inject(HttpClient);
  // LOCAL
  apiURL = `${environment.API_URL}/author`;
  #authorSubject = new BehaviorSubject<void>(undefined);
  authors$: Observable<Author[]> = this.#authorSubject.pipe(
    switchMap(() => {
      const cache = localStorage.getItem(STORAGE_KEY);
      return cache
        ? of(JSON.parse(cache))
        : this.#http.get<Author[]>(this.apiURL).pipe(
            map((books) => books.map(authorAdapter)),
            tap((adapted) =>
              localStorage.setItem(STORAGE_KEY, JSON.stringify(adapted))
            )
          );
    })
  );

  addAuthor({ nombre, genero }: Omit<Author, 'id'>) {
    return this.#http
      .post<Author>(this.apiURL, {
        name: nombre,
        gender: genero,
      })
      .pipe(
        tap(() => {
          localStorage.removeItem(STORAGE_KEY);
          this.#authorSubject.next();
        })
      );
  }

  updateAuthor(id: number, { nombre, genero }: Omit<Author, 'id'>) {
    return this.#http
      .put<Author>(`${this.apiURL}/${id}`, {
        name: nombre,
        gender: genero,
      })
      .pipe(
        tap(() => {
          localStorage.removeItem(STORAGE_KEY);
          this.#authorSubject.next();
        })
      );
  }

  deleteAuthor(id: string) {
    return this.#http.delete(`${this.apiURL}/${id}`).pipe(
      tap(() => {
        localStorage.removeItem(STORAGE_KEY);
        this.#authorSubject.next();
      })
    );
  }
}
