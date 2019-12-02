import { ProfileUserService } from './profile-user.service';
import { User } from './../../shared/user.model';
import { AuthFireService } from './../../auth-fire/authFire.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User as userFirebase } from 'firebase';


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  @ViewChild('profileForm', {static: false})
  form: NgForm;
  error;
  userAuth: userFirebase;
  user: User;
  user$: Observable<User>;
  private userSub;
  isLoading = false;

  constructor(private authFireService: AuthFireService,
              private profileUserService: ProfileUserService) { }

  ngOnInit() {
    this.userAuth = this.authFireService.user;
    if (this.getProfileUserData(this.userAuth) !== (null || undefined)) {

      this.getProfileUserData(this.userAuth).then(
        res => {
          // const o = res.val();
          res.forEach(x =>  {
            this.user = x.val();
          });
          console.log('profileData', this.user );
          // this.form.setValue(this.user);
        }
      );
    }
    this.profileUserService.getProfileUserData$(this.userAuth).subscribe(
      res => {
        this.user$ = res;
        console.log('', this.user$)
      }
    );
  }

  getProfileUserData(userAuth: any) {
    return this.profileUserService.getProfileUserData(userAuth);
  }

  onSubmit(profileForm: NgForm) {
    const u: User = profileForm.value;
    u.id = this.user.id;
    this.profileUserService.storeUserAPI(u);
    console.log('zapisano user', u);

    alert('zapisano');
  }
}
