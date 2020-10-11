import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import { MailInfo } from 'src/app/interfaces/mail-info';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  afUser$: Observable<User> = this.afAuth.user;
  userName: string;
  email: any;
  private title = 'イベント参加者通知';
  private msg = `${this.userName}さん `;

  constructor(
    private sendMailService: SendMailService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afUser$.subscribe((user) => {
      this.email = user?.email;
      this.userName = user?.displayName;
      // console.log(this.email);
    });
  }

  editPost() {
    console.log('edit');
  }

  deletePost() {
    console.log('delete');
  }

  sendMail() {
    const info = {
      to: this.email,
      title: this.title,
      msg: this.msg,
    };
    this.sendMailService.sendMail(info);
  }
}
