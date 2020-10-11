import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  @Input() type: string;

  today = new Date(new Date().toDateString());

  constructor() {}

  ngOnInit(): void {}
}
