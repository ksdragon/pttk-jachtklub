import { User } from './../../shared/user.model';
import { ProfileUserService } from './../../contents/profile-user/profile-user.service';
import { Component, OnInit } from '@angular/core';
import Quill from 'quill';

// pobranie kasy Delta z Quill
const Delta = Quill.import('delta');

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {

  isEditable = false;
  title = 'Tytuł';
  user: User;

  constructor(private profileUserService: ProfileUserService) { }

  ngOnInit() {
    this.user = this.profileUserService.user;
    if (this.user){
      console.log('user', this.user);
      if (this.user.categoryUser === 'admin') {
      }
    }
    console.log('user', this.user);
    const longString = new Array(100).fill('').join('Hello World! ');
    const contents = new Delta().insert(longString);
    const quill = new Quill('#editor',  {
      placeholder: 'Coś wpisać? ',
      modules: {
        toolbar: true    // Snow includes toolbar by default
      },
      theme: 'bubble'
    });
    // quill.enable(false);
    // this.editorPage.editorInstance.setContents(contents);
    const startTime = new Date();
    quill.setContents(contents);
    const stopTime = new Date();
    console.log('Time is ::: ', stopTime.getMilliseconds() - startTime.getMilliseconds());
    console.log(quill.getLength());
  }



}
