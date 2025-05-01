import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EChartsOption } from 'echarts';

import { BooksService } from '@core/services/books.service';

@Component({
  selector: 'app-summary-books',
  templateUrl: './summary-books.component.html',
  styleUrl: './summary-books.component.scss',
})
export class SummaryBooksComponent {
  // DI
  #booksService = inject(BooksService);
  // LOCAL
  options$: Observable<EChartsOption> = this.#booksService.books$.pipe(
    map((books) => {
      const countByYear: Record<string, number> = {};
      books.forEach((b) => {
        countByYear[b.anio] = (countByYear[b.anio] || 0) + 1;
      });

      const years = Object.keys(countByYear).sort();
      const values = years.map((year) => countByYear[year]);

      return {
        title: { text: 'Libros por año' },
        tooltip: {},
        xAxis: { type: 'category', data: years },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: values }],
      };
    })
  );
}
