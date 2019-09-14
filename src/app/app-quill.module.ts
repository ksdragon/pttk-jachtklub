import { QuillModule } from 'ngx-quill';
import { NgModule } from '@angular/core';

const toolbar  =  [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],               // custom button values
  [{ list: 'ordered'}, { list: 'bullet' }],
  [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
  [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
  [{ direction: 'rtl' }],                         // text direction

  [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],                                         // remove formatting button

  ['link', 'image', 'video']                         // link and image, video
];

@NgModule({
  imports: [
    QuillModule.forRoot({
      modules: {
          toolbar
      },
      placeholder: 'Compose an epic...',
      debug: 'warn',

    })
  ],
  exports: [QuillModule]
})

export class AppQuillModule {
}
