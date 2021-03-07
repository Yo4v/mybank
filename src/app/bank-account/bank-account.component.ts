import { NullTemplateVisitor, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { AccountOwner } from '../account-owner';
import { AccountService } from '../account.service';
import { transactionsListService } from '../all-transactions.service';
import { BankAccountDetails } from '../bank-account-details';
import { MenuService } from '../menu.service';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { LoginService } from '../login.service';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css'],
})
export class BankAccountComponent implements OnInit {
  transaction: BankTransaction = null;
  accountDetails: BankAccountDetails = null;
  currentAmount: number = null;
  currentBalanceView: number = 0;
  currentBalance: number = 0;
  currentDate: Date = new Date(null);
  currentTransactionType: TransactionType = null;
  currentTransactionAsmachta: string = null;
  currentTransactionDate: Date = null;
  transactionTypeNames: string[] = [];
  newTtransactionTypeNames: string[] = [];
  limit: number = -2000;
  lastActionFail: boolean = null;
  currentOwner: AccountOwner = null; //new AccountOwner("plonit almonit", "TA", "129387465");
  editAccountOwner: boolean = false;
  editAccountDetails: boolean = false;
  transactionsList: BankTransaction[] = [];
  comment: string = null;
  title: string = null;
  index: number = 0;
  realindex: number = null;

  constructor(
    private router_srv: Router,
    private login_srv: LoginService,
    private owner_srv: OwnerService,
    public trans_srv: transactionsListService,
    private account_srv: AccountService,
    private menu_srv: MenuService
  ) {
    //this.transaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAccount);
    this.accountDetails = account_srv.theAccountDetails;
    //this.currentOwner = owner_srv.theAccountOwner;
    for (let optn in TransactionType) {
      if (isNaN(Number(optn))) {
        this.transactionTypeNames.push(optn);
      }
    }
    for (let nOptn in TransactionType) {
      if (isNaN(Number(nOptn))) {
        this.newTtransactionTypeNames.push(nOptn);
      }
    }
    this.newTtransactionTypeNames.splice(0, 1);
    this.index = trans_srv.sidori;
  }
  doTransaction(): void {
    let datelimit = new Date('2021-03-01');
    this.currentBalanceView = 0;
    if (this.transactionsList.length < 1) {
      if (this.currentTransactionType == TransactionType.withdraw) {
        alert('משיכה לא אפשרית - חשבונך עדיין לא נפתח');
        return;
      } else this.currentTransactionType = TransactionType.openAccount;
      this.comment = 'פתיחת חשבון';
    }
    if (this.transactionsList.length >= 1) {
      if (this.currentTransactionType == TransactionType.openAccount) {
        alert('יש להזין תנועה במערכת');
        document.getElementById('sugpeula').focus();
        return;
      }
    }
    if (this.currentTransactionType == null) {
      alert('יש להזין תנועה במערכת');
      document.getElementById('sugpeula').focus();
      return;
    }
    this.lastActionFail = false;
    var date = new Date(this.currentTransactionDate);
    let today = new Date();
    if (date < this.currentDate || date > today) {
      alert('התאריך לא תקין - אין להזין פעולה עם תאריך עתידי');
      document.getElementById('taarich').focus();
      return;
    } else if (date < datelimit) {
      alert('יש להזין תאריך מהחודש האחרון');
      document.getElementById('taarich').focus();
      return;
    } else this.currentDate = date;
    if (
      this.currentTransactionAsmachta == null ||
      this.currentTransactionAsmachta == ' '
    ) {
      this.currentTransactionAsmachta =
        '#n' + (this.trans_srv.sidori + 1);
    }
    switch (this.currentTransactionType * 1) {
      case TransactionType.deposit:
        if (this.currentAmount * 1 < 0) {
          alert('אין להזין סכום שלילי');
          document.getElementById('amount').focus();
          return;
        } else {
          this.currentBalance += this.currentAmount * 1;
          this.trans_srv.sidori++;
        }
        break;
      case TransactionType.withdraw:
        if (this.currentBalance - this.currentAmount < this.limit) {
          if (this.currentAmount * 1 < 0) {
            alert('אין להזין סכום שלילי');
            document.getElementById('amount').focus();
            return;
          }
          this.lastActionFail = true;
          return;
        }
        this.currentBalance -= this.currentAmount * 1;
        this.trans_srv.sidori++;
        break;
      case TransactionType.openAccount:
        if (this.currentAmount * 1 <= 0) {
          alert('יש להזין סכום חיובי בעת פתיחת החשבון');
          document.getElementById('amount').focus();
          return;
        }
        this.currentBalance = this.currentAmount * 1;
        this.trans_srv.sidori++;
      default:
        this.currentBalance = this.currentAmount * 1;
        break;
    }
    this.transaction = new BankTransaction(
      this.currentAmount,
      new Date(this.currentTransactionDate),
      this.currentTransactionAsmachta,
      this.currentTransactionType,
      this.comment,
      this.trans_srv.sidori,
      this.currentBalance,
      this.realindex
    );
    this.transactionsList.push(this.transaction);
    for (let i = 0; i < this.transactionsList.length; i++) {
      this.transactionsList[i].realindex = i;
    }
    this.trans_srv.setTransaction(this.transactionsList);
    this.trans_srv.doTransaction(this.transactionsList);
    for (let i = 0; i < this.transactionsList.length; i++) {
      if (
        this.transactionsList[i].trnTyp == 1 ||
        this.transactionsList[i].trnTyp == 0
      )
        this.currentBalanceView += this.transactionsList[i].amount * 1;
      else if (this.transactionsList[i].trnTyp == 2)
        this.currentBalanceView -= this.transactionsList[i].amount * 1;
    }
    this.menu_srv.setBalance(this.currentBalanceView);
  }
  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }
  logOut(): void {
    this.login_srv.logout();
    this.router_srv.navigateByUrl('/AccountLogin');
    this.trans_srv.emptyArray();
  }
  ngOnInit(): void {
    if (!this.login_srv.userSignedIn()) {
      this.router_srv.navigateByUrl('/home');
    }
    this.menu_srv.setShow(true);
    this.transactionsList = this.trans_srv.getAllTtansaction();
    this.currentBalanceView = this.trans_srv.getCurrentBalance();
    this.menu_srv.setBalance(this.currentBalanceView);
    this.index = this.trans_srv.sidori;
    this.currentDate = this.trans_srv.getLastDate();
    this.currentBalance = this.trans_srv.getLastBalnce();
    this.currentBalance = this.trans_srv.getCurrentBalance();
    this.title = this.account_srv.toString();
    for (let i = 0; i < this.transactionsList.length; i++) {
      this.transactionsList[i].realindex = i;
    }
  }
  updateBrnch(): void {
    if (!this.editAccountDetails) {
      this.account_srv.editAccount(this.accountDetails);
      this.accountDetails = this.account_srv.theAccountDetails;
    }
  }
}