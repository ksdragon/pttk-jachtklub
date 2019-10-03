import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-editor-view-layout',
  templateUrl: './editor-view-layout.component.html',
  styleUrls: ['./editor-view-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorViewLayoutComponent implements OnInit {

  @Input() contentView;

  constructor() { }

  ngOnInit() {
    console.log('editorViewLayout', this.contentView);
  }

  onclick(contentView) {
    console.log('kliknięcie', contentView);
  }
}
