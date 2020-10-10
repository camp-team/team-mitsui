import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventDialogComponent } from 'src/app/dialogs/create-event-dialog/create-event-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  eventList = [
    {
      title: 'イベントタイトルが入ります。',
    },
    {
      title: 'イベントタイトルが入ります。',
    },
    {
      title: 'イベントタイトルが入ります。',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateEventDialog() {
    this.dialog.open(CreateEventDialogComponent, {
      width: '560px',
    });
  }
}
