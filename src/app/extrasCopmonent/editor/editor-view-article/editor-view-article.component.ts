import { AuthFireService } from './../../../auth-fire/authFire.service';
import { User } from './../../../shared/user.model';
import { Observable } from 'rxjs';
import { ProfileUserService } from './../../../contents/profile-user/profile-user.service';
import { ArticlePage } from './../../../shared/article-page.model';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { EditorService } from './../editor.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editor-view-article',
  templateUrl: './editor-view-article.component.html',
  styleUrls: ['./editor-view-article.component.scss']
})
export class EditorViewArticleComponent implements OnInit {

 contentView;
 article: ArticlePage;
 createDate;
 header;
 userId;
 user$: Observable<User>;
 curentAuthUser$: Observable<User>;

  constructor(private route: ActivatedRoute,
              private dataStorage: DataStorage,
              private profileUserService: ProfileUserService,
              private authFireService: AuthFireService) { }

  ngOnInit() {
    this.curentAuthUser$ = this.profileUserService.getProfileUserObs$();
    const id = this.route.snapshot.params.id;
    // console.log('id', id);
    this.dataStorage.asyncArticles$.subscribe(
      (data: ArticlePage[]) => {
        this.article = data.find(a => a.id === id);
        this.contentView = this.article.articlePage;
        this.createDate = this.article.createDate;
        this.header = this.article.header;
        this.userId = this.article.uid;
        this.user$ = this.profileUserService.getProfileUserById(this.article.uid);
      }
      );
  }

  onClickUser() {

  }

  onClickDate() {

  }

  onClickEdit(){

  }

}


// console.log('this.createDate', this.createDate);
    // this.route.params.subscribe((params: Params) => {
    //   this.article = this.editorService.getArticleById(+params.id);
    //   this.contentView = this.article.articlePage;
    //   console.log(+params.id);
    // });
