import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { transactionsListService } from '../all-transactions.service';
import { MenuService } from '../menu.service';
import { LoginService } from '../login.service';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private router_srv: Router,
    private trans_srv: transactionsListService,
    private login_srv: LoginService,
    private menu_srv: MenuService,
    private owner_srv: OwnerService
  ) {}
  logout(): void {
    this.login_srv.logout();
    this.router_srv.navigateByUrl('/AccountLogin');
  }
  getShow(): boolean {
    return this.menu_srv.getShow();
  }
  ngOnInit(): void {}
}
