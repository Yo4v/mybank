const activeBank: string = "Big Bank Inc";

export class BankAccountDetails {
    bankName: string = activeBank;
    constructor(public branchName: string, public branchNumber: number, public accountNumber: string) { }
}
