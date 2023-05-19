import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  input: string = '';
  inputChanged: Subject<string> = new Subject<string>();
  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((value) => {
        this.searchEvent.emit(value);
      });
  }
}
