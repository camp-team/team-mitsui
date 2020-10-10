import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  tabIndex: number;
  tab = 1;

  readonly tabs = [1, 2, 3];

  constructor() {}

  ngOnInit(): void {}

  editPost() {
    console.log('edit');
  }

  deletePost() {
    console.log('delete');
  }

  clickTab(i: number) {
    this.tab = i;
  }
}
