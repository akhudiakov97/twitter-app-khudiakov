import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TwitterRoutingParam } from '@app/shared/constants/twitter-routing-param.constant';
import { FilterType } from '@app/shared/constants/filter-type.constant';
import { hashtagLink, userLink } from '@app/shared/constants/links.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly links = {
    user: userLink,
    hashtag: hashtagLink
  };

  constructor(
    private router: Router
  ) {
  }

  isHashtagBtnActive(): boolean {
    return this.router.isActive(this.links.hashtag, true);
  }

  isUserBtnActive(): boolean {
    return this.router.isActive(this.links.user, true);
  }
}
