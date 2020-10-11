import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CreateEventDialogComponent } from 'src/app/dialogs/create-event-dialog/create-event-dialog.component';
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
  ownerEventId$ = this.user$.pipe(
    switchMap((user) => this.userService.getOwnerEventIds(user.uid))
  );
  // event$ = this.ownerEventId$.pipe(
  //   switchMap(async (eventId) => this.eventService.getEvent(eventId.id))
  // );

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.authService.afUser$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        console.log(user.uid); // uidが表示 OK
        // console.log(this.userService.getOwnerEventIds(user.uid));
      });
  }

  ngOnInit(): void {}

  openCreateEventDialog() {
    this.dialog.open(CreateEventDialogComponent, {
      width: '560px',
    });
  }
}
