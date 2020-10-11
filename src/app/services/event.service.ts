import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { EventId } from '../interfaces/event-id';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  async createEvent(uid: string, event: Event) {
    const id = this.db.createId();
    await this.db.doc(`events/${id}`).set({
      eventId: id,
      title: event.title,
      description: event.description,
      eventDate: event.eventDate,
      eventOpenTime: event.eventOpenTime,
      ownerUserId: uid,
    });
    await this.userService.addOwnerEventId(uid, id);
  }

  getEvent(eventId: string): Observable<Event> {
    return this.db.doc<Event>(`events/${eventId}`).valueChanges();
  }
}
