import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// import * as QuillNamespace from 'quill';
// let Quill: any = QuillNamespace;
import * as Quill from 'quill';

import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

import ImageDrop from 'quill-image-drop-and-paste';
Quill.register('modules/imageDrop', ImageDrop);

import Emoij from 'quill-emoji';
Quill.register('modules/emoij', Emoij);

// import Wordcounter from 'quill-wordcounter';
// Quill.register('modules/wordcounter', Wordcounter);

import Wordcounter from './couterWords';
Quill.register('modules/wordcounter', Wordcounter);

@Component({
  selector: 'app-dock-page',
  templateUrl: './dock-page.component.html',
  styleUrls: ['./dock-page.component.scss']
})
export class DockPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
