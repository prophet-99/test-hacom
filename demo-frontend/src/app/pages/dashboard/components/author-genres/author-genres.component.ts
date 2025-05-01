import { Component, inject } from '@angular/core';
import { AuthorsService } from '@core/services/authors.service';
import { BooksService } from '@core/services/books.service';
import { EChartsOption } from 'echarts';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-author-genres',
  templateUrl: './author-genres.component.html',
  styleUrl: './author-genres.component.scss',
})
export class AuthorGenresComponent {
  //DI
  #booksService = inject(BooksService);
  #autorsService = inject(AuthorsService);
  // LOCAL
  options$: Observable<EChartsOption> = combineLatest([
    this.#booksService.books$,
    this.#autorsService.authors$,
  ]).pipe(
    map(([books, autors]) => {
      const genreMap: Record<string, number> = {};

      books.forEach((book) => {
        const author = autors.find((a) => a.id.toString() === book.idAutor);
        const genre = author?.genero ?? 'Desconocido';
        genreMap[genre] = (genreMap[genre] || 0) + 1;
      });

      const data = Object.entries(genreMap).map(([name, value]) => ({
        name,
        value,
      }));

      return {
        title: { text: 'Libros por Genero', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Genero',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    })
  );
}
