import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  error;
  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.isLoading = true;
  }
}
