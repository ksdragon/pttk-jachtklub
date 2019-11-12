import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editor-view-layout',
  templateUrl: './editor-view-layout.component.html',
  styleUrls: ['./editor-view-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorViewLayoutComponent implements OnInit {

  @Input() contentView;
  @Input() id: number;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('editorViewLayout id', this.id);
    console.log('editorViewLayout id', this.contentView);
  }

  onclick() {
    this.router.navigate(['/article', this.id]);
  }
}
