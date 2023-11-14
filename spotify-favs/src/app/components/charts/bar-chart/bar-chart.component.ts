import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartItem } from 'src/app/interfaces/ChartItem';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public chart: any;
  @Input() chartItems: ChartItem[] = [];

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart != undefined) {
      this.removeData(this.chart);
      this.addData(this.chart);
    }
  }

  createChart() {
    this.chart = new Chart('bar-chart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.chartItems.map((item) => item.name),
        datasets: [
          {
            label: 'Count',
            data: this.chartItems.map((item) => item.count),
            backgroundColor: this.chartItems.map((item) => item.color),
          },
        ],
      },
      options: {
        aspectRatio: 1.5,

      },
    });
  }

  addData(chart: Chart) {
    (chart.data.labels = this.chartItems.map((item) => item.name)),
      chart.data.datasets.forEach((dataset) => {
        dataset.data = this.chartItems.map((item) => item.count);
      });
    chart.update();
  }

  removeData(chart: Chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    chart.update();
  }

}
