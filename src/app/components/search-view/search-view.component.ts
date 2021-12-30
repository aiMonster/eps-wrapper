import { Component, OnInit } from '@angular/core';
import { MonthConstants } from 'src/app/constants/month.constants';
import { IChartData } from 'src/app/interfaces/chart-data.interface';
import { IChartValue } from 'src/app/interfaces/chart-value.interface';
import { IHistorySearchRequest } from 'src/app/interfaces/history-search-request.interface';
import { IMeterDate } from 'src/app/interfaces/meter-date.interface';
import { AccountInfoParserService } from 'src/app/services/account-info-parser.service';
import { AccountInfoService } from 'src/app/services/account-info.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {
  // TODO: Don't hardcode keys
  private readonly key = 'zA728ZPJCGo_e1kV_rVw5Q';
  private readonly haiKey = 'KVLk-u-8sakSmqm3Tx8aAg';

  chartDatasets: IChartData[] = [];

  constructor(
    private accountInfoService: AccountInfoService,
    private parser: AccountInfoParserService
  ) { }

  /** On init */
  ngOnInit(): void {
    // TODO: Call somewhere else
    // TODO: Add some loaders
    
    this.accountInfoService.getCurrentMeters(this.haiKey).subscribe();
  }

  searchForMeters(request: IHistorySearchRequest): void {
    this.accountInfoService.getMetersHistory(this.haiKey, request.dateFrom, request.dateTo).subscribe(response => {
      this.setNewChartValues(response)
    });
  }

  // TODO: Move to the service
  setNewChartValues(response: string): void {
    // Get parsed values
    let meters = this.parser.parseMetersHistory(response);

    // Remove values that were sent twice in the same month. Use latest
    meters = meters.filter(meterValue => {
      return !meters.some(v => 
        v.date.year === meterValue.date.year && 
        v.date.month === meterValue.date.month && 
        v.date.day > meterValue.date.day
      );
    });

    // Calculate used meters
    const chartValues: IChartValue[] = [];
    meters.forEach(value => {
      // Check if some meters are not split
      const chartValue = chartValues.find(v => v.date.initial === value.date.initial && v.type === value.type);

      if (chartValue) {
        chartValue.value += this.calculate(value.previousValue, value.currentValue);
      } else {
        chartValues.push({
          date: value.date,
          type: value.type,
          value: this.calculate(value.previousValue, value.currentValue)
        });
      }
    });

    // Group by service
    this.chartDatasets = [];
    chartValues.forEach(meterValue => {
      const meterChartData = this.chartDatasets.find(chValue => chValue.title === meterValue.type);

      if (meterChartData) {
        meterChartData.values.push(meterValue.value);
        meterChartData.labels.push(this.getDateLabel(meterValue.date));
      } else {
        this.chartDatasets.push({
          title: meterValue.type,
          labels: [this.getDateLabel(meterValue.date)],
          values: [meterValue.value]
        });
      }
    });
  }

  /** Calculates used meters */
  private calculate(prev: number, current: number): number {
    // If meter counter has been replaced to new, we do start from 0
    if (current < prev) {
      return current;
    }else {
      return current - prev;
    }
  }

  /** Returns date label */
  private getDateLabel(date: IMeterDate): string {
    const months = MonthConstants.UKR;
    return `${months[date.month - 1]} ${date.year}`;
  }
}
