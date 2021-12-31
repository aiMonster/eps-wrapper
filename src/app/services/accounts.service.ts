import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccount } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly accountsStorageKey = 'accounts';

  private accounts = new BehaviorSubject<IAccount[]>(this.getAccounts());
  public accounts$ = this.accounts.asObservable();

  /** Constructor */
  constructor() { }

  /** Gets accounts from the local storage */
  getAccounts(): IAccount[] {
    const accounts = localStorage.getItem(this.accountsStorageKey);
    return accounts ? JSON.parse(accounts as string) : [];
  }

  /** Saves accounts to the local storage */
  saveAccounts(accounts: IAccount[]): void {
    localStorage.setItem(this.accountsStorageKey, JSON.stringify(accounts));
    this.accounts.next(accounts);
  }
}
