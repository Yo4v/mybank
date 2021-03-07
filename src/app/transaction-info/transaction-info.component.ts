import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { transactionsListService } from '../all-transactions.service';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css'],
})
export class TransactionInfoComponent implements OnInit {
  names: string[] = null;
  transaction: BankTransaction = null;
  constructor(
    private router_srv: Router,
    private trans_srv: transactionsListService,
    private route: ActivatedRoute,
    private login_srv: LoginService
  ) {
    this.names = trans_srv.transactionTypeNames;
  }
  deleteTransaction(): void {
    if (confirm('האם ברצונך למחוק שורה?'))
      if (this.transaction.trnTyp == 0) {
        alert('לא ניתן למחוק את פעולת פתיחת החשבון');
        return;
      } else {
        this.trans_srv.allTransactions.splice(this.transaction.realindex, 1);
        this.trans_srv.setTransaction(this.trans_srv.allTransactions);
        this.router_srv.navigateByUrl('/transactionTable');
      }
  }
  returnToBnkTrns(): void {
    this.router_srv.navigateByUrl('/transactionTable');
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.transaction = this.trans_srv.getTransactionById(id);
    if (!this.login_srv.userSignedIn()) {
      this.router_srv.navigateByUrl('/home');
    }
  }
}