import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { BankAccountDetails } from './bank-account-details';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankTransaction, TransactionType } from './bank-transaction';
const ALL_TRANSACTIONS_KY: string = 'ALL_TRANSACTIONS';
@Injectable({
  providedIn: 'root',
})
export class transactionsListService {
  public allTransactions: BankTransaction[];
  public sidori: number = 0;
  transactionTypeNames: string[] = [];
  newBalance: number = null;
  constructor() {
    for (let optn in TransactionType) {
      if (isNaN(Number(optn))) {
        this.transactionTypeNames.push(optn);
      }
    }
    if (localStorage.getItem('ALL_TRANSACTIONS_KY') != null) {
      try {
        this.allTransactions = JSON.parse(
          localStorage.getItem('ALL_TRANSACTIONS_KY')
        );
      } catch (prblm) {
        localStorage.setItem(
          'ALL_TRANSACTIONS_KY',
          JSON.stringify(this.allTransactions)
        );
      }
    } else {
      localStorage.setItem(
        'ALL_TRANSACTIONS_KY',
        JSON.stringify(this.allTransactions)
      );
    }
  }
  setTransaction(ezer: BankTransaction[]) {
    this.allTransactions = ezer;
  }
  doTransaction(allTrans: BankTransaction[]) {
    this.allTransactions = allTrans;
    localStorage.setItem(
      'ALL_TRANSACTIONS_KY',
      JSON.stringify(this.allTransactions)
    );
  }
  getTransactionById(id: string): BankTransaction {
    for (let i = 0; i < this.allTransactions.length; i++)
      if (this.allTransactions[i].index.toString() == id)
        return this.allTransactions[i];
    return null;
  }
  getCurrentBalance(): number {
    this.newBalance = 0;
    for (let i = 0; i < this.allTransactions.length; i++) {
      if (
        this.allTransactions[i].trnTyp == 0 ||
        this.allTransactions[i].trnTyp == 1
      )
        this.newBalance += this.allTransactions[i].amount;
      else if (this.allTransactions[i].trnTyp == 2)
        this.newBalance -= this.allTransactions[i].amount;
    }
    return this.newBalance;
  }
  emptyArray(): void {
    this.allTransactions = [];
    this.newBalance = 0;
    this.sidori = 0;
  }
  getAllTtansaction(): BankTransaction[] {
    return this.allTransactions;
  }
  getLastDate(): Date {
    if (this.allTransactions.length >= 1)
      return this.allTransactions[this.allTransactions.length - 1].trnDate;
  }
  getLastBalnce(): number {
    if (this.allTransactions.length >= 1)
      return this.allTransactions[this.allTransactions.length - 1]
        .currentBalance;
  }
}
