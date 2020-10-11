import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import { MailInfo } from 'src/app/interfaces/mail-info';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { Event } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
// import { User } from 'src/app/interfaces/user';
import { User } from 'firebase';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event$: Observable<Event>;
  afUser$: Observable<User> = this.afAuth.user;
  userName: string;
  email: any;
  uid: string;
  joinUsers: string[];
  joinUser$: any;
  private title = 'イベント参加者通知';
  private msg = `ありがとうございます。参加を確認しました。`;

  constructor(
    private route: ActivatedRoute,
    private eventSearvice: EventService,
    private sendMailService: SendMailService,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.event$ = this.eventSearvice.getEventById(params.get('id'));
    });
    this.afUser$.subscribe((user) => {
      this.email = user?.email;
      this.userName = user?.displayName;
      this.uid = user?.uid;
    });
  }

  sendMail(uid: string, eventId: string) {
    const info = {
      to: this.email,
      title: this.title,
      msg: this.msg,
    };
    this.sendMailService.sendMail(info);
    this.clickToJoin(uid, eventId);
  }

  clickToJoin(uid: string, eventId: string) {
    this.eventSearvice.joinEvent(uid, eventId);
  }
}
