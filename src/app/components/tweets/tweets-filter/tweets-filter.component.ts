import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tweets-filter',
  templateUrl: './tweets-filter.component.html',
  styleUrls: ['./tweets-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetsFilterComponent implements OnInit, OnDestroy {
  @ViewChild('filter', { static: true }) inputRef: ElementRef<HTMLInputElement>;
  @Input() filterType: string;
  @Output() filterValueChange = new EventEmitter<string>();

  private subs = new SubSink();

  constructor() {
  }

  ngOnInit(): void {
    this.subs.sink = fromEvent<KeyboardEvent>(this.inputRef.nativeElement, 'keydown').pipe(
      distinctUntilChanged(),
      debounceTime(200),
    ).subscribe((keyboardEvent) => {
      const filterValue = (keyboardEvent.target as HTMLInputElement).value;
      if (filterValue) {
        this.filterValueChange.emit(filterValue);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onInputClick(): void {
    this.filterValueChange.emit(this.inputRef.nativeElement.value);
  }
}
