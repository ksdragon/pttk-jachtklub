import { map } from 'rxjs/operators';
import { ArticleContent } from './article-content.model';
import { ArticleContentService } from './article-content.service';
import { User } from './../../shared/user.model';
import { ProfileUserService } from './../../contents/profile-user/profile-user.service';
import { Component, OnInit } from '@angular/core';
import Quill, { DeltaStatic } from 'quill';
import { ActivatedRoute } from '@angular/router';

// pobranie kasy Delta z Quill
const Delta = Quill.import('delta');

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {

  isEditable = false;
  isAuthUser = false;
  title = 'Tytuł';
  user: User;
  quill: Quill;
  content;

  constructor(private profileUserService: ProfileUserService,
              private route: ActivatedRoute,
              private articleContentService: ArticleContentService) {
               }

  ngOnInit() {
    this.user = this.profileUserService.user;
    if (this.user) {
      if (this.user.categoryUser === ('admin' || 'manager')) {
        this.isAuthUser = true;
      }
    }
    // console.log('user', this.user);
    // const longString = new Array(100).fill('').join('Hello World! ');
    // const contents = new Delta().insert(longString);
    this.quill = new Quill('#editor',  {
      placeholder: 'Coś wpisać? ',
      modules: {
        toolbar: true    // Snow includes toolbar by default
      },
      theme: 'bubble'
    });
    this.quill.enable(this.isEditable);
    // this.editorPage.editorInstance.setContents(contents);
    const startTime = new Date();
    this.articleContentService.articleContent$.subscribe(
      x => {
        this.content = x.content;
      }
    );
    // this.route.data.subscribe((data) => this.content = data.articleContent);
    console.log('this.content from resolver:', this.content);
    this.quill.setContents(this.content);
    // this.articleContentService.getArticleByName(this.route.snapshot.url.toString()).subscribe(
    //   respone => {
    //     this.quill.setContents(respone.content);
    //     this.title = respone.title;
    //     console.log('respone:', respone);
    //   }
    // );
    const stopTime = new Date();
    console.log('Time is ::: ', stopTime.getMilliseconds() - startTime.getMilliseconds());
    console.log(this.quill.getLength());
  }

  onEdit() {
    this.isEditable = !this.isEditable;
    this.quill.enable(this.isEditable);
  }

  onSave() {
    const article: ArticleContent = {
      name: this.route.snapshot.url.toString(),
      title: this.title,
      content: this.quill.getContents()
    };
    this.articleContentService.storeArticleContent(article);
    console.log('Saved article', article);
  }


}
