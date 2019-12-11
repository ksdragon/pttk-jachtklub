import { map } from 'rxjs/operators';
import { ArticleContent } from './article-content.model';
import { ArticleContentService } from './article-content.service';
import { User } from './../../shared/user.model';
import { ProfileUserService } from './../../contents/profile-user/profile-user.service';
import { Component, OnInit } from '@angular/core';
import Quill, { DeltaStatic } from 'quill';
import { ActivatedRoute } from '@angular/router';

// solution for keep style in img
import '../../shared/quill-blots/image-format.blots.js';
// import all modules from one file.
import '../../shared/quill-blots/import-shared-modules.js';

// import '../../../shared/quill-blots/router-link.blots.js';
import '../../shared/quill-blots/router-link-image.blots.js';
// import '../../../shared/quill-modules/image-compressor.module.js';
import '../../shared/quill-modules/custom-image-compressor.module';

// pobranie kasy Delta z Quill
const Delta = Quill.import('delta');

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {

  isEditable = false;
  isAuthUser = false;
  title = 'Tytuł';
  user: User;
  quill: Quill;
  content;


  toolbarOptions =
    [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'], ['emoji'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction

      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], ['hr'], ['spanblock'],                                   // remove formatting button

      ['link', 'image', 'video', 'span-block'],
      // link and image, video
    ];

  constructor(private profileUserService: ProfileUserService,
              private route: ActivatedRoute,
              private articleContentService: ArticleContentService) {
               }

  ngOnInit() {
    this.user = this.profileUserService.user;
    if (this.user) {
      if (this.user.categoryUser === ('admin' || 'manager')) {
        this.isAuthUser = true;
      }
    }
    // console.log('user', this.user);
    // const longString = new Array(100).fill('').join('Hello World! ');
    // const contents = new Delta().insert(longString);
    this.quill = new Quill('#editor',  {
      placeholder: 'Coś wpisać? ',
      modules: {
      'emoji-toolbar': true,
      imageDrop: true,
      imageResize: true,
      imageCompressor: {
        // customImageCompressor: {
          quality: 0.9, // default
          maxWidth: 1000, // default
          imageType: 'image/jpeg', // default
          debug: true, // default
      },
        toolbar: {container: this.toolbarOptions}    // Snow includes toolbar by default
      },
      theme: 'bubble'
    });
    this.quill.enable(this.isEditable);
    // this.editorPage.editorInstance.setContents(contents);
    const startTime = new Date();
    this.content = this.articleContentService.articleContent$.value;
    // this.articleContentService.articleContent$.subscribe(
    //   x => {
    //     this.content = x;
    //   }
    // );
    this.route.data.subscribe((data) => console.log('Resolver form param data ', data.articleContent));
    console.log('Resolver form snapshot', this.route.snapshot.data.articleContent );
    console.log('this.content from resolver:', this.content);
    this.quill.setContents(this.content.content);
    this.title = this.content.title;
    // this.articleContentService.getArticleByName(this.route.snapshot.url.toString()).subscribe(
    //   respone => {
    //     this.quill.setContents(respone.content);
    //     this.title = respone.title;
    //     console.log('respone:', respone);
    //   }
    // );
    const stopTime = new Date();
    console.log('Time is ::: ', stopTime.getMilliseconds() - startTime.getMilliseconds());
    console.log(this.quill.getLength());
  }

  onEdit() {
    this.isEditable = !this.isEditable;
    this.quill.enable(this.isEditable);
  }

  onSave() {
    const article: ArticleContent = {
      name: this.route.snapshot.url.toString(),
      title: this.title,
      content: this.quill.getContents()
    };
    this.articleContentService.storeArticleContent(article);
    console.log('Saved article', article);
  }


}
