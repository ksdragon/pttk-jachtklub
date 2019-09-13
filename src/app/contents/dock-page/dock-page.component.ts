import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dock-page',
  templateUrl: './dock-page.component.html',
  styleUrls: ['./dock-page.component.scss']
})
export class DockPageComponent implements OnInit {

  editorForm: FormGroup;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  options = {
    placeholder: 'Compose an epic...'
  };

  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup ({
      editor: new FormControl(null)
    });
  }


  onSubmit() {
    console.log(this.editorForm.get('editor').value);
  }

}
