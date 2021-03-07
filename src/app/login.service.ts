import { Injectable } from '@angular/core';
import { UserCredentials } from './user-credentials';
const USER_CREDENTIALS_KY: string = 'USER_CREDENTIALS';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private theUserCredential: UserCredentials = new UserCredentials(
    'siteAdmin@bigbank.com',
    '1234'
  );
  private currentUser: UserCredentials = null;

  constructor() {
    if (localStorage.getItem(USER_CREDENTIALS_KY) == null) {
      localStorage.setItem(
        USER_CREDENTIALS_KY,
        JSON.stringify(this.theUserCredential)
      );
    } else {
      try {
        this.theUserCredential = JSON.parse(
          localStorage.getItem(USER_CREDENTIALS_KY)
        );
      } catch (prblm) {
        localStorage.setItem(
          USER_CREDENTIALS_KY,
          JSON.stringify(this.theUserCredential)
        );
      }
    }
  }

  authenticateIdPwd(email: string, pwd: string): boolean {
    let rc = false;
    if (
      email == this.theUserCredential.uid &&
      pwd == this.theUserCredential.pwd
    ) {
      rc = true;
      this.currentUser = new UserCredentials(
        this.theUserCredential.uid,
        this.theUserCredential.pwd
      );
    }
    return rc;
  }
  authenticatePwd(pwd: string): boolean {
    return this.currentUser != null && pwd == this.currentUser.pwd;
  }
  userSignedIn(): boolean {
    return this.currentUser != null;
  }
  logout(): void {
    this.currentUser = null;
  }
  changePassword(nwpwd: string): boolean {
    let rslt: boolean = false;
    if (this.userSignedIn()) {
      this.theUserCredential.pwd = nwpwd;
      localStorage.setItem(
        USER_CREDENTIALS_KY,
        JSON.stringify(this.theUserCredential)
      );
      rslt = true;
    }
    return rslt;
  }
}