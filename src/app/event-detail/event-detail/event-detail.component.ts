import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event$: Observable<Event>;

  constructor(
    private route: ActivatedRoute,
    private eventSearvice: EventService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.event$ = this.eventSearvice.getEventById(params.get('id'));
    });
  }
}
