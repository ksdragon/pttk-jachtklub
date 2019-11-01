function warnAboutOptions(options) {
  if (options.maxWidth && typeof options.maxWidth !== "number") {
    console.warn(
      `[config error] 'maxWidth' is required to be a "number" (in pixels),
recieved: ${options.maxWidth}
-> using default 1000`,
    );
    options.maxWidth = 1000;
  }
  if (options.quality && typeof options.quality !== "number") {
    console.warn(
      `quill.imageCompressor: [config error] 'quality' is required to be a "number",
recieved: ${options.quality}
-> using default 0.7`,
    );
    options.quality = 0.7;
  }
  if (
    options.imageType &&
    (typeof options.imageType !== "string" ||
      !options.imageType.startsWith("image/"))
  ) {
    console.warn(
      `quill.imageCompressor: [config error] 'imageType' is required be in the form of "image/png" or "image/jpeg" etc ...,
recieved: ${options.imageType}
-> using default image/jpeg`,
    );
    options.imageType = "image/jpeg";
  }
}

import ImageCompress from 'quill-image-compress';
import Quill from 'quill';


class Compressor extends ImageCompress {
  quill: any;
  range: any;
  options: any;
  debug: boolean;
  constructor(quill, options) {
    super(quill, options);
    this.quill = quill;
    // console.log(quill);
    this.options = options;
    this.range = null;
    this.debug = options.debug === null || options.debug === true;

    warnAboutOptions(options);

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
    'api'
    );
    // Move cursor to next position
    range.index++;
    this.quill.setSelection(range.index, 'silent');
  }

}
Quill.register('modules/imageCompress', Compressor);
