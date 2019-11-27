import { ProfileUserService } from './profile-user.service';
import { User } from './../../shared/user.model';
import { AuthFireService } from './../../auth-fire/authFire.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User as userFirebase } from 'firebase';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  error;
  userAuth: userFirebase;
  user: User;
  private userSub;
  isLoading = false;

  constructor(private authFireService: AuthFireService,
              private profileUserService: ProfileUserService) { }

  ngOnInit() {
    this.userAuth = this.authFireService.user;
    console.log('profileData', this.getProfileUserData(this.userAuth));
  }

  getProfileUserData(userAuth: any) {
    return this.profileUserService.getProfileUserData(userAuth);
  }

  onSubmit(profileForm: NgForm) {
    const u: User = profileForm.value;
    this.profileUserService.storeUserAPI(u);
    console.log('User', u);

    alert('zapisano');
  }
}
