import { Account } from '@app/shared/models/account.constant';

export class Tweet {
  constructor(
    partial: Partial<Tweet> = {},
    public account: Account = partial.account || null,
    public date: string = partial.date || null,
    public hashtags: string[] = partial.hashtags || null,
    public likes: number = partial.likes || null,
    public replies: number = partial.replies || null,
    public retweets: number = partial.retweets || null,
    public text: string = partial.text || null,
  ) {
  }
}
