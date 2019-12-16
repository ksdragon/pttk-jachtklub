import Quill from 'quill';

const Inline = Quill.import('blots/inline');
class EndTitleBlock extends Inline {

  static create(value) {
    const node = super.create();
    node.setAttribute('class', 'end-title');
    return node;
  }
}

EndTitleBlock.blotName = 'end-title';
EndTitleBlock.tagName = 'div';
Quill.register(EndTitleBlock);
