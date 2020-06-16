import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { SubSink } from '@app/shared/utils/subsink.utils';

@Component({
  selector: 'app-tweets-filter',
  templateUrl: './tweets-filter.component.html',
  styleUrls: ['./tweets-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetsFilterComponent implements OnInit, OnDestroy {
  @ViewChild('filter', { static: true }) inputRef: ElementRef<HTMLInputElement>;
  @Input() filterType: string;
  @Output() searchInput = new EventEmitter<string>();

  private subs = new SubSink();
  private currentFilterValue = '';

  constructor() {
  }

  ngOnInit(): void {
    this.subs.sink = fromEvent<KeyboardEvent>(this.inputRef.nativeElement, 'keydown').pipe(
      distinctUntilChanged(),
      debounceTime(200),
    ).subscribe((keyboardEvent) => {
      const val = (keyboardEvent.target as HTMLInputElement).value;
      if (val) {
        this.currentFilterValue = val;
        this.searchInput.emit(val);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onInputClick(): void {
    if (this.inputRef.nativeElement.value !== this.currentFilterValue) {
      this.searchInput.emit(this.inputRef.nativeElement.value);
    }
  }
}
