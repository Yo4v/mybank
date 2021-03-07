import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private show: boolean = true;
  private balance: number = 0;
  constructor() {}
  public getShow(): boolean {
    return this.show;
  }
  public setShow(ezer: boolean): void {
    this.show = ezer;
  }
  public getBalance(): number {
    return this.balance;
  }
  public setBalance(ezer: number): void {
    this.balance = ezer;
  }
}
