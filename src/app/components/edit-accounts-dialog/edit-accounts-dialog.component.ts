import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IAccount } from 'src/app/interfaces/account.interface';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-edit-accounts-dialog',
  templateUrl: './edit-accounts-dialog.component.html',
  styleUrls: ['./edit-accounts-dialog.component.scss']
})
export class EditAccountsDialogComponent implements OnInit {
  /** Accounts collection */
  accounts: IAccount[] = []

  /** Constructor */
  constructor(
    private ref: DynamicDialogRef,
    private accountsService: AccountsService
  ) { }

  /** On init */
  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
  }

  /** Removes an account */
  removeAccount(index: number): void {
    this.accounts.splice(index, 1);
  }

  /** Adds an account */
  addAccount(): void {
    this.accounts = [...this.accounts, {
      title: '',
      key: ''
    }];
  }

  /** Saves changes */
  save(): void {
    this.accountsService.saveAccounts(this.accounts);
    this.ref.close()
  }
}
