import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { EmptyErrorCtor } from 'rxjs/internal/util/EmptyError';
import { transactionsListService } from '../all-transactions.service';
import { BankAccountDetails } from '../bank-account-details';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class transactionsTableComponent implements OnInit {
  @Input() transactionsListTable: BankTransaction[];
  //@Input()transactionTypeNames: TransactionType;
  currentTransactionTypeComp: TransactionType = null;
  transactionsList: BankTransaction[];
  transactionTypeNames: string[];
  index: number = null;
  constructor(
    private trans_srv_srv: transactionsListService,
    private login_srv: LoginService,
    private router_srv: Router
  ) {
    this.transactionsList = trans_srv_srv.allTransactions;
  }
  ngOnInit(): void {
    if (!this.login_srv.userSignedIn()) {
      this.router_srv.navigateByUrl('/home');
    }
    this.index = this.trans_srv_srv.sidori;
    this.transactionTypeNames = this.trans_srv_srv.transactionTypeNames;
  }
}