import Quill from "quill";
const InlineLink = Quill.import("blots/inline");
// checks url is without vulnerability
import { sanitize } from "quill/formats/link";
// to register icon in toolbar
const icons = Quill.import("ui/icons");


class RouteLinkImage extends InlineLink {
  /**
   *  najważniejsza część - tworzenie elementu.
   * @param {Object} data - JSON format,
   * wykorzytywany przez metodę Quill.insertEmbed
   */
  static create(data) {
    const node = super.create(data);
    // console.log('data - RouteLinkImage', data);
    if (typeof data === "object") {
      node.setAttribute("routerLink", this.sanitize(data.routerLink));
      node.setAttribute("rel", "noopener noreferrer");
      const child = document.createElement("img");
      // console.log('data - src', data.src);
      child.setAttribute("src", this.sanitize(data.src));
      child.setAttribute("style", this.sanitize(data.style));
      node.appendChild(child);
    }
    return node;
  }

  /**
   * pobiera cały selektor
   * nie wiem kiedy to się wywołuje?
   * @param {*} domNode
   */
  static value(domNode) {
    console.log('domNode', domNode);
    return {
      routerLink: domNode.getAttribute("routerLink"),
      src: domNode.firstChild.getAttribute("src"),
      style: domNode.firstChild.getAttribute("style"),
    };
  }

  /**
   * Sprawdzenie czy jest odpowiedniego typu
   * @param {String} url: boolean
   */
  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  /**
   * checks value from attack vulnerability
   * @param {String} url
   */
   static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  /**
   * zwraca obiekt z atrybutami i wartościami selektora
   * nie wiem gdzie wykorzystane
   * nie działa poprawnie
   * pobiera cały selektor
   * @param {String} domNode: Object
   */
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

  /**
   * Nie wiem kiedy wywoływane i do czego wykorzystywane w quill
   * @param {*} name
   * @param {*} value
   */
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

// lista
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

// pola przypisywane do obiektu data w trakcie tworzenia blotsa
RouteLinkImage.blotName = "routerLinkImage";
RouteLinkImage.tagName = "a";
RouteLinkImage.className = "ql-router-link-image";

// lista po której sprawdza metoda sanitize dozwolone formaty.
RouteLinkImage.PROTOCOL_WHITELIST = ["http", "https",
       "mailto", "tel", "data", "display", "margin", "float"];

// rejestrowanie ikony w toolbar
icons["routerLinkImage"] = '<i class="fas fa-camera-retro"></i>';
Quill.register(RouteLinkImage);
