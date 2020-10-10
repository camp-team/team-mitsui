import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUserData(uid: string): Observable<any> {
    return this.db.doc(`users/${uid}`).valueChanges();
  }

  async createUser(uid: string, googleProfile: any): Promise<void> {
    const userData: User = {
      uid,
      name: googleProfile.name,
      avatarURL: googleProfile.picture,
      email: googleProfile.email,
      ownerEventIds: [],
      attendEventIds: [],
      absentEventIds: [],
      considerEventIds: [],
    };
    await this.db.doc(`users/${uid}`).set(userData);
  }

  getOwnerUserEvents(uid: string) {
    return this.db.doc(`users/${uid}/ownerEvents/`).valueChanges();
  }
}
