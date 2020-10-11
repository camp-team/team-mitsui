import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { MailInfo } from '../interfaces/mail-info';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class SendMailService {
  constructor(private fns: AngularFireFunctions) {}

  sendMail(obj) {
    const sendMail = this.fns.httpsCallable('sendMail');
    return sendMail(obj).toPromise();
  }
}
