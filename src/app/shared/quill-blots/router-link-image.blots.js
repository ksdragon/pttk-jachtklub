import Quill from "quill";
const InlineLink = Quill.import("blots/inline");
const Image = Quill.import("formats/image");

class RouteLinkImage extends InlineLink {
  static create(value, src) {
    const node = super.create(value);
    value = this.sanitize(value);
    node.setAttribute("routerLink", value);
    node.setAttribute("rel", "noopener noreferrer");
    let img = node.createElement("img");
    img.setAttribute("src", this.sanitize(src));
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute("routerLink");
  }

  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) { return super.format(name, value); }
    value = this.constructor;
    value.sanitize(value);
    this.domNode.setAttribute("routerLink", value);
  }
}

RouteLinkImage.blotName = "routerLinkImage";
RouteLinkImage.tagName = "A";
RouteLinkImage.SANITIZED_URL = "about:blank";
RouteLinkImage.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];

function sanitize(url, protocols) {
  const anchor = document.createElement("a");
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
  return protocols.indexOf(protocol) > -1;
}
Quill.register(RouteLinkImage);
