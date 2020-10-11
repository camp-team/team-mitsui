import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginProcessing = false;
  uid: string;
  afUser$: Observable<User> = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.afUser$.subscribe((user) => {
      this.uid = user?.uid;
    });
  }

  async login(): Promise<void> {
    this.loginProcessing = true;
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await this.afAuth.signInWithPopup(provider);
    const googleProfile = userCredential.additionalUserInfo.profile as any;
    return this.userService
      .getUserData(this.uid)
      .pipe(take(1))
      .toPromise()
      .then((userDoc) => {
        if (!userDoc) {
          this.userService
            .createUser(this.uid, googleProfile)
            .then(() => {
              this.succeededLogin();
              this.router.navigateByUrl('/');
            })
            .catch((error) => {
              this.failedLogin(error);
            });
        }
      });
  }

  succeededLogin() {
    this.snackBar.open('ログインしました。', '閉じる');
    this.loginProcessing = false;
  }

  failedLogin(error: { message: any }) {
    this.loginProcessing = false;
    console.error(error.message);
    this.snackBar.open(
      'ログインエラーです。数秒後にもう一度お試しください。',
      '閉じる'
    );
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました。');
      this.router.navigateByUrl('/');
    });
  }
}
