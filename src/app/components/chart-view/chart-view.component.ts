import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { ChartConstants } from 'src/app/constants/chart.constants';
import { IChartData } from 'src/app/interfaces/chart-data.interface';
import { ChartType } from 'src/app/types/chart.type';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
  /** Chart index on the screen */
  @Input() chartIndex: number = 0;

  /** Chart dataset */
  @Input() dataset: IChartData | undefined;

  /** Chart component */
  @ViewChild(UIChart) chartComponent!: UIChart;
  
  /** Chart configuration */
  options = ChartConstants.OPTIONS;
  chartType: ChartType = 'bar';
  chartColor: string | undefined;

  /** Chart data */
  data: any;

  /** Chart view options selectors */
  chartTypeOptions: { icon: string, value: ChartType } [] = [];
  colorOptions: { color: string } [] = [];

  /** Constructor */
  constructor() { }

  /** On init */
  ngOnInit(): void {
    this.setData();
    this.setSelectorsOptions();
  }

  /** Update chart type */
  updateChartType(): void {
    this.chartComponent.type = this.chartType;
    this.chartComponent.reinit();
  }

  /** Update chart color */
  updateChartColor(): void {
    this.data.datasets[0].borderColor = this.chartColor;
    this.data.datasets[0].backgroundColor = this.chartColor;
    this.chartComponent.refresh();
  }

  /** Sets options for chart view */
  private setSelectorsOptions(): void {
    this.chartTypeOptions = [
      { icon: "pi pi-chart-line", value: 'line' },
      { icon: "pi pi-chart-bar", value: 'bar' }
    ];

    this.colorOptions = ChartConstants.COLORS.map(value => {
      return { color: value }
    });
  }

  /** Sets chart data */
  private setData(): void {
    this.chartColor = ChartConstants.COLORS[this.chartIndex];

    this.data = {
      labels: this.dataset?.labels,
      datasets: [{
        label: this.dataset?.title,
        data: this.dataset?.values,
        fill: false,
        borderColor: this.chartColor,
        backgroundColor: this.chartColor,
        tension: .4
      }]
    };
  }
}
