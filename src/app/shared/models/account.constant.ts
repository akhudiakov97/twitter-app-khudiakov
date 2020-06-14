export class Account {
  constructor(
    partial: Partial<Account> = {},
    public fullname: string = partial.fullname || null,
    public href: string = partial.href || null,
    public id: number = partial.id || null,
  ) {
  }
}
