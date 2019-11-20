import { ArticlePage } from './../../shared/article-page.model';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorService } from '../editor/editor.service';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { IConfigPagination } from 'src/app/contents/main-page/main-page.component';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-articles-content',
  templateUrl: './articles-content.component.html',
  styleUrls: ['./articles-content.component.scss']
})
export class ArticlesContentComponent implements OnInit {

@Input() config?: IConfigPagination;
asyncArticles: Observable<ArticlePage[]>;
p = 1;
isFetching = false;
total;


constructor(private dataStorage: DataStorage,
            private db: AngularFireDatabase) {
  this.db.list('articles').valueChanges().subscribe(
    response => {
      this.total = response.length;
    });
}

ngOnInit() {
  this.getPage(1);
  }

getPage(page: number) {
  this.isFetching = true;
  this.asyncArticles = this.dataStorage.serverCall(
    page,
    this.config.itemsPerPage); // potrzebne do szblonu żeby zmieniać css.
  this.p = page;
  this.isFetching = false;
    // za wolno działa w porównanu z API firebase.
    // this.asyncArticles = this.dataStorage.fetchAriticlesPagination();
    // this.asyncArticles.subscribe(data => {
    //   console.log('data', data);
    // });
  }

}
