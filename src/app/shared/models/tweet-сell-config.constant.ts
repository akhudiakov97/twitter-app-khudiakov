import { TweetTableValue } from '@app/shared/constants/tweet-table-value';

export class TweetCellConfig {
  constructor(
    partial: Partial<TweetCellConfig> = {},
    public titleClassName: string = partial.titleClassName || null,
    public cellClassName: string = partial.cellClassName || null,
    public title: string = partial.title || null,
    public value: TweetTableValue = partial.value || null,
  ) {
  }
}
