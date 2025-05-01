import { Component } from '@angular/core';
import { interval, map, scan, startWith } from 'rxjs';
import { type DataPoint } from './simulate-chart.model';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-simulate-chart',
  templateUrl: './simulate-chart.component.html',
  styleUrl: './simulate-chart.component.scss',
})
export class SimulateChartComponent {
  options$ = interval(5000).pipe(
    startWith(0),
    map(() => this.#generateDataPoint()),
    scan<DataPoint, DataPoint[]>((acc, curr) => {
      const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
      const updated = [...acc, curr].filter((p) => p.timestamp >= twoHoursAgo);
      return updated;
    }, []),
    map((dataPoints) => {
      return {
        title: { text: 'Registro en tiempo real' },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: dataPoints.map((dp) =>
            new Date(dp.timestamp).toLocaleTimeString()
          ),
          boundaryGap: false,
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Registros',
            type: 'line',
            data: dataPoints.map((dp) => dp.value),
            areaStyle: {},
          },
        ],
      } satisfies EChartsOption;
    })
  );

  #generateDataPoint(): DataPoint {
    return {
      timestamp: Date.now(),
      value: Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000,
    };
  }
}
