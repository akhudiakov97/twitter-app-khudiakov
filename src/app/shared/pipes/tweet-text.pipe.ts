import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tweetTextPipe' })
export class TweetTextPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 50) {
      return value.slice(0, value.length - 3) + '...';
    }
    return value;
  }
}
