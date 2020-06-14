import { Tweet } from '@app/shared/models/tweet.constant';

export class TweetsResponse {
  constructor(
    partial: Partial<TweetsResponse> = {},
    public count: number = partial.count || null,
    public offset: number = partial.offset || null,
    public results: Tweet[] = partial.results || null,
  ) {
  }
}
