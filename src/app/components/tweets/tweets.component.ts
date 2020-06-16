import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FilterType } from '@app/shared/constants/filter-type.constant';
import { TwitterRoutingParam } from '@app/shared/constants/twitter-routing-param.constant';
import { ActivatedRoute } from '@angular/router';
import { capitalize } from '@app/shared/utils/capitalize.utils';
import { ApiService } from '@app/services/api.service';
import { TweetsResponse } from '@app/shared/models/tweets-response.constant';
import { Tweet } from '@app/shared/models/tweet.constant';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ApiService
  ]
})
export class TweetsComponent implements OnInit, OnDestroy {
  filterType: FilterType;
  tweets: Tweet[] = [];
  private subs = new SubSink();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.getFilterType();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getFilteredTweets(filterValue: string): void {
    this.subs.sink = (this.filterType === FilterType.USER
      ? this.apiService.getTweetsByUser(filterValue)
      : this.apiService.getTweetsByHashTag(filterValue)).subscribe(
      (tweetsResponse: TweetsResponse) => {
        this.tweets = tweetsResponse.results;
        this.cd.detectChanges();
      });
  }

  private getFilterType(): void {
    this.subs.sink = this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.filterType = (capitalize(paramMap.get(TwitterRoutingParam.FILTER_TYPE)) as FilterType);
      this.tweets = [];
      this.cd.detectChanges();
    });
  }
}
