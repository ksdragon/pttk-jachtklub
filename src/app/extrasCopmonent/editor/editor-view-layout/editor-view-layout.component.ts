import { EditorService } from './../editor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-view-layout',
  templateUrl: './editor-view-layout.component.html',
  styleUrls: ['./editor-view-layout.component.scss']
})
export class EditorViewLayoutComponent implements OnInit {

  contentView;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
  }

}
