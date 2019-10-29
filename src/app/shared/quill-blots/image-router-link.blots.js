import Quill from "quill";
const InlineLink = Quill.import("blots/inline");
const Image = Quill.import("formats/image");
const Parchment = Quill.import("parchment");

import Block from "quill/blots/block";
import Embed from "quill/blots/embed";
import { sanitize } from "quill/formats/link";
const icons = Quill.import("ui/icons");

class ImageRouteLink extends InlineLink {
  static create(data) {
    const node = super.create(data);
    // data = this.sanitize(data);
    if (typeof data === "object") {
      node.setAttribute("src", this.sanitize(data.src));
      const child = document.createElement("A");
      child.setAttribute("routerLink", this.sanitize(data.routerLink));
      child.setAttribute("rel", "noopener noreferrer");
      node.appendChild(child);
    }
    return node;
  }

  static value(domNode) {
    return {
      routerLink: domNode.firstChild.getAttribute("routerLink"),
      src: domNode.getAttribute("src"),
    };
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }
  // checks value from attack vulnerability
  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  static formats(domNode) {
    console.log('domNode', domNode);
    return ImageFormatAttributesList.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      } else {
      if (domNode.firstChild.hasAttribute(attribute)) {
        formats[attribute] = domNode.firstChild.getAttribute(attribute);
      }
    }

      console.log('formats', formats);
      return formats;
    }, {});
  }

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

ImageRouteLink.blotName = "imageRouterLink";
ImageRouteLink.tagName = "IMG";
ImageRouteLink.className = "ql-image-router-link";
ImageRouteLink.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
icons["ImageRouteLink"] = '<i class="fas fa-camera-retro"></i>';
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
Quill.register(ImageRouteLink);
