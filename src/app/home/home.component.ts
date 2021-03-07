import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { transactionsListService } from '../all-transactions.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router_srv: Router,private menu_srv:MenuService,private trans_srv:transactionsListService) { }

  ngOnInit(): void {
    this.menu_srv.setShow(false);
  }
  emptyArray():void{
    this.trans_srv.emptyArray();
  }

}
