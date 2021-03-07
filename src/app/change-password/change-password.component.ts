import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { MenuComponent } from '../menu/menu.component';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  crntPwd: string;
  nwPwd: string;
  nw2Pwd: string;

  jobDone: boolean = false;

  constructor(private router_srv: Router, private login_srv: LoginService, private menu_srv:MenuService) { }

  updtIt(): void {
    this.jobDone = false;

    if (this.crntPwd == null || this.nwPwd == null || this.nw2Pwd == null) {
      alert("אחד או יותר משדות הקלט ריקים")
      return;
    }
    if (!this.login_srv.authenticatePwd(this.crntPwd)) {
      alert("סיסמא נוכחית שגויה")
      return;
    }
    if (this.nwPwd != this.nw2Pwd) {
      alert("סיסמא חדשה  חייבת להיות זהה לוידוא סיסמא חדשה")
      return;
    }
    if (!this.login_srv.changePassword(this.nwPwd)) {
      alert("עדכון סיסמא נכשל")
      return;
    }
    this.jobDone = true;
  }

  ngOnInit(): void {
    if (!this.login_srv.userSignedIn()) {
      this.router_srv.navigateByUrl("/home");
    }
    this.menu_srv.setShow(false);
  }

}
