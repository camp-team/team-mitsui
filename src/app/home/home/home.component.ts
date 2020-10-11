import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CreateEventDialogComponent } from 'src/app/dialogs/create-event-dialog/create-event-dialog.component';
import { Event } from 'src/app/interfaces/event';
import { EventId } from 'src/app/interfaces/event-id';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.authService.afUser$;
  ownerEventId$: Observable<EventId[]> = this.user$.pipe(
    switchMap((user) => this.userService.getOwnerEventIds(user.uid))
  );
  uid: string;
  events$: Observable<Event[]>;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.authService.afUser$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.events$ = this.userService.getOwnerEvent(user.uid);
      });
  }

  openCreateEventDialog() {
    this.dialog.open(CreateEventDialogComponent, {
      width: '560px',
    });
  }
}
