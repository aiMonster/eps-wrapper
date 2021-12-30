import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MonthConstants } from 'src/app/constants/month.constants';
import { IHistorySearchRequest } from 'src/app/interfaces/history-search-request.interface';

// TODO: Fix dropdown z-index

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  private readonly monthsRange = 36;
  private readonly defaultSearchRange = 6;

  /** Emits when options selected and user calls Search */
  @Output() optionsSelected = new EventEmitter<IHistorySearchRequest>();

  /** Available date range options */
  dateOptions: { label: string, value: Date } [] = [];

  /** Selected dates */
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  /** Constructor */
  constructor() { }

  /** On Init */
  ngOnInit(): void {
    this.setDateOptions();
  }

  /** Calls search */
  search(): void {
    const request: IHistorySearchRequest = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    };

    this.optionsSelected.emit(request);
  }

  /** Sets available date range options */
  private setDateOptions(): void {
    const dates: Date[] = [];
    
    let startDate = this.getNextMonthDate(new Date());
    dates.push(startDate);

    for (let i = 1; i < this.monthsRange; i++) {
      startDate = this.getPrevMonthDate(startDate);
      dates.push(startDate);
    }

    this.dateOptions = dates.map(d => this.getDateOption(d));

    this.dateFrom = this.dateOptions[this.defaultSearchRange - 1].value;
    this.dateTo = this.dateOptions[0].value;
  }

  /** Returns next month of provided date */
  private getNextMonthDate(date: Date): Date {
    const lastMonth = date.getMonth() === 11;

    const year = lastMonth ? date.getFullYear() + 1 : date.getFullYear();
    const month = lastMonth ? 0 : date.getMonth() + 1;

    return new Date(year, month, 1);
  }

  /** Returns previous month of provided date */
  private getPrevMonthDate(date: Date): Date {
    const firstMonth = date.getMonth() === 0;

    const year = firstMonth ? date.getFullYear() - 1 : date.getFullYear();
    const month = firstMonth ? 11 : date.getMonth() - 1;

    return new Date(year, month, 1);
  }

  /** Returns date option with appropriate label */
  private getDateOption(date: Date): any {
    return {
      label: `${MonthConstants.UKR[date.getMonth()]} ${date.getFullYear()}`,
      value: date
    };
  }
}
