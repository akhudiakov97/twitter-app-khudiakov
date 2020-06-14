import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TweetsComponent } from '@app/components/tweets/tweets.component';
import { hashtagLink, userLink } from '@app/shared/constants/links.constant';
import { TwitterRoutingParam } from '@app/shared/constants/twitter-routing-param.constant';
import { FilterType } from '@app/shared/constants/filter-type.constant';


const routes: Routes = [
  {
    path: '',
    redirectTo: hashtagLink,
    pathMatch: 'full',
  },
  {
    path: `${TwitterRoutingParam.TWEETS}/:${TwitterRoutingParam.FILTER_TYPE}`,
    component: TweetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
