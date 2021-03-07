import { Injectable } from '@angular/core';
import { AccountOwner } from './account-owner';
const ACCOUNT_OWNER_DETAILS_KY: string = "ACCOUNT_OWNER_DETAILS";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public theAccountOwner: AccountOwner = new AccountOwner("plonit almonit", "TA", "129387465");

  constructor() {
    if (localStorage.getItem('ACCOUNT_OWNER_DETAILS_KY') != null) { 
      try
      {
      this.theAccountOwner = JSON.parse(localStorage.getItem('ACCOUNT_OWNER_DETAILS_KY'));
      }
      catch(prblm){
        localStorage.setItem('ACCOUNT_OWNER_DETAILS_KY', JSON.stringify(this.theAccountOwner));
      }
    }
    else {
      localStorage.setItem('ACCOUNT_OWNER_DETAILS_KY', JSON.stringify(this.theAccountOwner));
    }
  }
  public updateOwner(nwOwnr: AccountOwner) {
    this.theAccountOwner = nwOwnr;
    localStorage.setItem('ACCOUNT_OWNER_DETAILS_KY', JSON.stringify(this.theAccountOwner));
  }
}
