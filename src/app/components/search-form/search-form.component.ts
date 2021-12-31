import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { MonthConstants } from 'src/app/constants/month.constants';
import { IAccount } from 'src/app/interfaces/account.interface';
import { IHistorySearchRequest } from 'src/app/interfaces/history-search-request.interface';
import { ISelectItem } from 'src/app/interfaces/select-item.interface';
import { AccountsService } from 'src/app/services/accounts.service';
import { EditAccountsDialogComponent } from '../edit-accounts-dialog/edit-accounts-dialog.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [DialogService]
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private readonly monthsRange = 36;
  private readonly defaultSearchRange = 6;
  private unsubscribe$ = new Subject<void>();

  /** Emits when options selected and user calls Search */
  @Output() optionsSelected = new EventEmitter<IHistorySearchRequest>();

  /** Available date range options */
  dateOptions: ISelectItem<Date> [] = [];

  /** Available accounts */
  accountOptions: ISelectItem<string> [] = [];

  /** Selected dates */
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  /** Selected account */
  accountKey: string = '';

  /** Constructor */
  constructor(
    private dialogService: DialogService,
    private accountsService: AccountsService
  ) { }

  /** On Init */
  ngOnInit(): void {
    this.setDateOptions();
    this.subscribeToAccountOptions();
  }

  /** On Destroy */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /** Calls search */
  search(): void {
    // TODO: add validations - key cannot be empty, date to can't be earlier then from
    const request: IHistorySearchRequest = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      key: this.accountKey
    };

    this.optionsSelected.emit(request);
  }

  /** Opens edit accounts dialog */
  editAccounts(): void {
    const ref = this.dialogService.open(EditAccountsDialogComponent, {
      header: 'Редагувати аккаунти',
      width: '550px',
      modal: false
    });
  }

  /** Subscribes to available accounts */
  private subscribeToAccountOptions(): void {
    this.accountsService.accounts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts: IAccount[]) => {
        this.accountOptions = accounts.map(account => {
          return {
            label: account.title,
            value: account.key
          };
        });
      });
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
  private getDateOption(date: Date): ISelectItem<Date> {
    return {
      label: `${MonthConstants.UKR[date.getMonth()]} ${date.getFullYear()}`,
      value: date
    };
  }
}
