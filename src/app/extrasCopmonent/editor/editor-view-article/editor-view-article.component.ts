import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editor-view-article',
  templateUrl: './editor-view-article.component.html',
  styleUrls: ['./editor-view-article.component.scss']
})
export class EditorViewArticleComponent implements OnInit {

  @Input() contentView;

  constructor() { }

  ngOnInit() {
  }

}
