import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../user-credentials';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MenuService } from '../menu.service';
import { transactionsListService } from '../all-transactions.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css'],
})
export class AccountLoginComponent implements OnInit {
  doel: string;
  sisma: string;
  ezer: boolean = false;
  constructor(
    private router_srv: Router,
    private login_srv: LoginService,
    private menu_srv: MenuService,
    private trans_srv: transactionsListService
  ) {}
  public logIn(): void {
    if (this.login_srv.authenticateIdPwd(this.doel, this.sisma)) {
      this.router_srv.navigateByUrl('/BankAccount');
    } else alert('דוא"ל לא מוכר או לא פעיל או הצירוף של הדוא"ל והסיסמא שגוי');
    //this.trans_srv.emptyArray();
  }
  ngOnInit(): void {
    this.menu_srv.setShow(false);
  }
}