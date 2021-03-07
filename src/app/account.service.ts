import { Injectable } from '@angular/core';
import { BankAccountDetails } from './bank-account-details';
const ACCOUNT_DETAILS_KY: string = 'ACCOUNT_DETAILS';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public theAccountDetails: BankAccountDetails = new BankAccountDetails(
    'Rimonim Givataim',
    762,
    '113344'
  );
  constructor() {
    if (localStorage.getItem('ACCOUNT_DETAILS_KY') != null) {
      try {
        this.theAccountDetails = JSON.parse(
          localStorage.getItem('ACCOUNT_DETAILS_KY')
        );
      } catch (prblm) {
        localStorage.setItem(
          'ACCOUNT_DETAILS_KY',
          JSON.stringify(this.theAccountDetails)
        );
      }
    } else {
      localStorage.setItem(
        'ACCOUNT_DETAILS_KY',
        JSON.stringify(this.theAccountDetails)
      );
    }
  }
  editAccount(nwBrnch: BankAccountDetails) {
    this.theAccountDetails = nwBrnch;
    localStorage.setItem(
      'ACCOUNT_DETAILS_KY',
      JSON.stringify(this.theAccountDetails)
    );
  }

  toString(): string {
    return `${this.theAccountDetails.bankName} Branch: (${this.theAccountDetails.branchNumber}) 
  ${this.theAccountDetails.branchName} Account#: ${this.theAccountDetails.accountNumber}`;
  }
}