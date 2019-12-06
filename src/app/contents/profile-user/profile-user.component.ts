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
  user: User;
  user$: Observable<User>;
  isLoading = false;
  categoryUsers;

  constructor(private profileUserService: ProfileUserService,
              private authFireService: AuthFireService) { }

  ngOnInit() {
    this.user$ = this.profileUserService.getProfileUserObs$();
    this.user = this.profileUserService.user;
    this.categoryUsers = this.profileUserService.categoryUser;
  }

  onSubmit(profileForm: NgForm) {
    const u: User = profileForm.value;
    u.id = this.user.id;
    this.profileUserService.storeUserAPI(u);
    console.log('zapisano user', u);

    alert('zapisano');
  }
}
