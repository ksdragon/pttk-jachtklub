import ImageCompress from 'quill-image-compress';
import Quill from 'quill';


class Compressor extends ImageCompress {
  quill: any;
  range: any;
  options: any;
  constructor(quill, options) {
    super(quill, options);
    this.quill = quill;
    // console.log(quill);
    this.options = options;
    this.range = null;
    // super.debug = options.debug === null || options.debug === true;

    // // super.warnAboutOptions(options);

    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler('routerLinkImage', super.selectLocalImage.bind(this));
  }

  insertToEditor(url) {
    const range = this.range;
    super.logFileSize(url);
    // console.log('url', `${url}`);
    // Insert the compressed image
    console.log('this.options', this.options.routerLink);
    this.quill.insertEmbed(range.index, 'routerLinkImage',
    {
      src: `${url}`,
      routerLink:  this.options.routerLink,
      style: this.options.style
    },
    'user'
    );
    // Move cursor to next position
    range.index++;
    this.quill.setSelection(range, 'api');
  }

}
Quill.register('modules/imageCompress', Compressor);
