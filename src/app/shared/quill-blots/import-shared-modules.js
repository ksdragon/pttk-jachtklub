// import Quill from 'quill';
import * as QuillNamespace from 'quill';
const Quill = QuillNamespace;

import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

import ImageDrop from 'quill-image-drop-and-paste';
Quill.register('modules/imageDrop', ImageDrop);

import Emoij from 'quill-emoji';
Quill.register('modules/emoij', Emoij);

import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompressor', ImageCompress);
