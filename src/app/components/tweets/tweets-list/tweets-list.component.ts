import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Tweet } from '@app/shared/models/tweet.constant';
import { TweetCellConfig } from '@app/shared/models/tweet-сell-config.constant';
import { HashtagPipe } from '@app/shared/pipes/hashtag.pipe';
import { DatePipe } from '@angular/common';
import { TweetTextPipe } from '@app/shared/pipes/tweet-text.pipe';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
  ]
})
export class TweetsListComponent{
  @Input() tweets: Tweet[] = [];
  page = 0;
  pageSize = 10;

  constructor(
    private hashtagPipe: HashtagPipe,
    private tweetTextPipe: TweetTextPipe,
    private datePipe: DatePipe,
  ) {
  }

  getTableConfig(tweet: Tweet): TweetCellConfig[] {
    return [
      new TweetCellConfig({
        title: 'Tweet',
        titleClassName: 'tweet-text-title',
        cellClassName: 'tweet-text',
        value: this.tweetTextPipe.transform(tweet.text)
      }),
      new TweetCellConfig({
        title: 'Likes',
        titleClassName: 'text-center',
        cellClassName: 'text-center',
        value: tweet.likes || '-'
      }),
      new TweetCellConfig({
        title: 'Replies',
        titleClassName: 'text-center',
        cellClassName: 'text-center',
        value: tweet.replies || '-'
      }),
      new TweetCellConfig({
        title: 'Retweets',
        titleClassName: 'text-center',
        cellClassName: 'text-center',
        value: tweet.retweets || '-'
      }),
      new TweetCellConfig({
        title: 'Hashtags',
        cellClassName: 'overflow-ellipsis',
        value: this.hashtagPipe.transform(tweet.hashtags)
      }),
      new TweetCellConfig({
        title: 'Date',
        value: this.datePipe.transform(tweet.date, 'mediumDate')
      }),
    ];
  }
}
