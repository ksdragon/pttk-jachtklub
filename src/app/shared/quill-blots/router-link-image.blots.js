import Quill from "quill";
const InlineLink = Quill.import("blots/inline");
import { sanitize } from "quill/formats/link";
const icons = Quill.import("ui/icons");
import Parchment from "parchment";

class RouteLinkImage extends InlineLink {
  static create(data) {
    const node = super.create(data);
    // data = this.sanitize(data);
    if (typeof data === "object") {
      node.setAttribute("routerLink", this.sanitize(data.routerLink));
      node.setAttribute("rel", "noopener noreferrer");
      const child = document.createElement("img");
      child.setAttribute("src", this.sanitize(data.src));
      node.appendChild(child);
    }
    return node;
  }

  static value(domNode) {
    return {
      routerLink: domNode.getAttribute("routerLink"),
      src: domNode.firstChild.getAttribute("src"),
    };
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }
  // checks value from attack vulnerability
  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  // static formats(domNode) {
  //   console.log('domNode', domNode);
  //   return ImageFormatAttributesList.reduce((formats, attribute) => {
  //     if (domNode.hasAttribute(attribute)) {
  //       formats[attribute] = domNode.getAttribute(attribute);
  //     }
  //     if (domNode.firstChild.hasAttribute(attribute)) {
  //       formats[attribute] = domNode.firstChild.getAttribute(attribute);
  //     }
  //     console.log('formats', formats);
  //     return formats;
  //   }, {});
  // }

  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      console.log('name', name);
      console.log('value', value);
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

}
const ImageFormatAttributesList = [
  "alt",
  "height",
  "width",
  "style",
  "src",
  "routerLink",
  "class",
  "rel",
];

RouteLinkImage.blotName = "routerLinkImage";
RouteLinkImage.tagName = "a";
RouteLinkImage.className = "ql-router-link-image";
RouteLinkImage.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];

icons["routerLinkImage"] = '<i class="fas fa-camera-retro"></i>';
Quill.register(RouteLinkImage);
