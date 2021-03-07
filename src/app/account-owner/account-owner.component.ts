import { Component, Input, OnInit } from '@angular/core';
import { AccountOwner } from '../account-owner';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  currentOwner:AccountOwner = null;
  editCurrentOwner:boolean = false;
  @Input()owner:AccountOwner;
  @Input()edit:boolean;
  constructor(private owner_srv: OwnerService) {
    this.currentOwner = owner_srv.theAccountOwner;
   }

  ngOnInit(): void {
  }
  updateOwner(): void {
    if (!this.editCurrentOwner)
      this.owner_srv.updateOwner(this.currentOwner);
  }
}