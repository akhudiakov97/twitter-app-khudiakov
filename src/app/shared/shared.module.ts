import { NgModule } from '@angular/core';
import { HashtagPipe } from '@app/shared/pipes/hashtag.pipe';
import { TweetTextPipe } from '@app/shared/pipes/tweet-text.pipe';

const pipes = [
  HashtagPipe,
  TweetTextPipe
];

@NgModule({
  declarations: [
    ...pipes,
  ],
  exports: [
    ...pipes,
  ],
  providers: [
    ...pipes
  ]
})
export class SharedModule {
  constructor() {
  }
}
