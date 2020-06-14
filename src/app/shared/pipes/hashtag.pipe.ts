import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hashtagPipe' })
export class HashtagPipe implements PipeTransform {
  transform(value: string[]): string {
    if (value.length > 2) {
      return value.slice(0, 2).join(', ');
    }
    return value.join(', ');
  }
}
