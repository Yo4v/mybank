import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { BranchEditComponent } from './change-branch/change-branch.component';
import { BankAccountDetails } from './bank-account-details';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { transactionsTableComponent } from './transactions-table/transactions-table.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component: ChangePasswordComponent },
  { path: 'ChangeOwnerDetail', component: AccountOwnerComponent },
  { path: 'ChangeBankDetail', component: BranchEditComponent },
  { path: 'transactionTable', component: transactionsTableComponent },
  { path: 'transactionInfo/:id', component: TransactionInfoComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
