import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, Input } from '@angular/core'
import { transactionsListService } from './all-transactions.service';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private trans_srv:transactionsListService){
    //this.balance=this.trans_srv.getCurrentBalance();
  }
  ngOnInit():void{
    
  }
}
