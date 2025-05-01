import { Component, inject } from '@angular/core';
import { BooksService } from '@core/services/books.service';
import { EChartsOption } from 'echarts';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-published-books',
  templateUrl: './published-books.component.html',
  styleUrl: './published-books.component.scss',
})
export class PublishedBooksComponent {
  // DI
  #booksService = inject(BooksService);
  // LOCAL
  options$: Observable<EChartsOption> = this.#booksService.books$.pipe(
    map((books) => {
      const published = books.filter((b) => b.publicado).length;
      const unpublished = books.filter((b) => !b.publicado).length;

      return {
        title: { text: 'Publicados\nvs\nNo Publicados', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Libro',
            type: 'pie',
            radius: '50%',
            data: [
              { value: published, name: 'Publicados' },
              { value: unpublished, name: 'No Publicados' },
            ],
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
