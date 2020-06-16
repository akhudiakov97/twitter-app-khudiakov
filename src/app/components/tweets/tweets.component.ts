import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FilterType } from '@app/shared/constants/filter-type.constant';
import { TwitterRoutingParam } from '@app/shared/constants/twitter-routing-param.constant';
import { ActivatedRoute } from '@angular/router';
import { capitalize } from '@app/shared/utils/capitalize.utils';
import { ApiService } from '@app/services/api.service';
import { TweetsResponse } from '@app/shared/models/tweets-response.constant';
import { SubSink } from 'subsink';
import { Subscription } from 'rxjs';

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
  tweetsResponse: TweetsResponse;
  tweetsSub: Subscription;
  filterValue: string;
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
    this.tweetsSub.unsubscribe();
    this.subs.unsubscribe();
  }

  getFilteredTweets(filterValue: string): void {
    this.filterValue = filterValue;
    this.tweetsSub = this.getTweets(filterValue);
  }

  onTweetsReload(updatedOffset: number): void {
    this.tweetsSub.unsubscribe();
    this.tweetsSub = this.getTweets(this.filterValue, updatedOffset);
  }

  private getFilterType(): void {
    this.subs.sink = this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.filterType = (capitalize(paramMap.get(TwitterRoutingParam.FILTER_TYPE)) as FilterType);
      this.tweetsResponse = null;
      this.cd.detectChanges();
    });
  }

  private getTweets(filterValue: string, offset?: number): Subscription {
    return (this.filterType.toLowerCase() === FilterType.USER
      ? this.apiService.getTweetsByUser(filterValue, offset)
      : this.apiService.getTweetsByHashTag(filterValue, offset)).subscribe(
      (tweetsResponse: TweetsResponse) => {
        this.tweetsResponse = tweetsResponse;
        this.cd.detectChanges();
      });
  }
}
