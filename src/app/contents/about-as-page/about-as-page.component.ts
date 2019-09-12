import { ArticleTemplate } from './../../shared/article-Template.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-as-page',
  templateUrl: './about-as-page.component.html',
  styleUrls: ['./about-as-page.component.scss']
})
export class AboutAsPageComponent implements OnInit {

  articleAboutUs: ArticleTemplate = {id: 1, headerName: 'O Nas', category: ['Nawigacja']};

  constructor() { }

  ngOnInit() {
  }

}
