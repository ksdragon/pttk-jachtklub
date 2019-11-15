import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorService } from '../editor/editor.service';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { IConfigPagination } from 'src/app/contents/main-page/main-page.component';

@Component({
  selector: 'app-articles-content',
  templateUrl: './articles-content.component.html',
  styleUrls: ['./articles-content.component.scss']
})
export class ArticlesContentComponent implements OnInit {

  @Input() config: IConfigPagination;
  asyncArticles: Observable<any[]>;
  isFetching = false;
  p = 1;
  total: number;
  perPage: number;

  constructor(private dataStorage: DataStorage,
              private db: AngularFireDatabase) {
            }

ngOnInit() {
  this.getPage(1);
  }

getPage(page: number) {
    this.db.list('articles').valueChanges()
              .subscribe( response => {
                this.total = response.length;
                console.log('response valueChanges', response.length);
              });
    this.perPage =  this.config.itemsPerPage;
    this.isFetching = true;
    this.asyncArticles = this.dataStorage.serverCall(page, this.perPage);
    this.p = page;
    this.isFetching = false;
  }

}
