import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { BankAccountDetails } from '../bank-account-details';

@Component({
  selector: 'app-change-branch',
  templateUrl: './change-branch.component.html',
  styleUrls: ['./change-branch.component.css'],
})
export class BranchEditComponent implements OnInit {
  //@Input()account: BankAccountDetails;
  //@Input()editAccount:boolean;
  account: BankAccountDetails = null;
  editAccount: boolean = false;
  title: string = null;
  onModifyBankDetails: Boolean = false;
  currentModifiableBankDetails: string = null;
  constructor(private account_srv: AccountService) {
    this.account = this.account_srv.theAccountDetails;
  }
  ngOnInit(): void {}
  updateBrnch(): void {
    if (!this.editAccount) {
      this.account_srv.editAccount(this.account);
    }
  }
  startModifyDescription() {
    this.currentModifiableBankDetails = this.account.branchName;
    this.onModifyBankDetails = true;
  }
  endModifyDescription() {
    this.account.branchName = this.currentModifiableBankDetails;
    this.onModifyBankDetails = false;
    this.account_srv.editAccount(this.account);
  }
  cancelModifyDescription() {
    this.onModifyBankDetails = false;
  }
}