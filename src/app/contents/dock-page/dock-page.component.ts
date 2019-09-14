import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-dock-page',
  templateUrl: './dock-page.component.html',
  styleUrls: ['./dock-page.component.scss']
})
export class DockPageComponent implements OnInit {

  con = {
    "ops": [
      {
        "insert": "Gandalf the Grey\n"
      }
    ]
  };


  editorForm: FormGroup;
  editorStyle = {
    height: '300px',
    backgroundColor: '#fff'
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

  maxLenght(e) {
   if (e.editor.getLength() > 10) {
      e.editor.deleteText(10, e.editor.getLength());
    }
  //  this.con = e.content;
  //  console.log(this.con);
  }
}
