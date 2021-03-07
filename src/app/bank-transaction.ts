export enum TransactionType { openAccount, deposit, withdraw }

export class BankTransaction {
    constructor(public amount: number, public trnDate: Date = new Date(), public asmachta: string, public trnTyp: TransactionType, public comnt: string, public index:number, public currentBalance:number,public realindex:number) { }
    toString(): string {
        return `פעולה של ${TransactionType[this.trnTyp]} בתאריך ${this.trnDate.toDateString()} בסכום  ₪${this.amount} (${this.comnt})`;
    }

}
