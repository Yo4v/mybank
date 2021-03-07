export class AccountOwner {
  constructor(
    public name: string,
    public address: string,
    public tz: string,
    public hasPicture: boolean = true
  ) {}
}
