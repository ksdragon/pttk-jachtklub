import Quill from "quill";
const InlineLink = Quill.import("blots/inline");
// checks url is without vulnerability
import { sanitize } from "quill/formats/link";
// to register icon in toolbar
const icons = Quill.import("ui/icons");
const Embed = Quill.import("blots/embed")


class RouteLinkImage extends Embed {
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
    // console.log('function value(domNode)', domNode);
    return {
      routerLink: domNode.getAttribute("routerLink"),
      src: domNode.getAttribute("src"),
      style: domNode.getAttribute("style"),
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
  static formats(domNode) {
    // console.log('domNode 1', domNode);
    return ImageFormatAttributesList.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      if (domNode.hasChildNodes()) {
        let children = domNode.childNodes;
        // console.log('children 1', children);
        for (var i = 0; i < children.length; i++) {
          if (children[i].nodeName !== "#text") {
            // console.log('children[i] 1', children[i].nodeName);
            if (children[i].firstChild.hasAttribute(attribute)) {
              formats[attribute] = children[i].firstChild.getAttribute(attribute);
            }
          }
        }
        // if (domNode.firstChild.hasAttribute(attribute)) {
        //   formats[attribute] = domNode.firstChild.getAttribute(attribute);
        // }
      }
      // console.log('formats 1', formats);
      return formats;
    }, {});
  }

  /**
   * Wykorzystywane przy rozszerzaniu klasy
   * const Embed = Quill.import("blots/embed")
   * przypisuje wartości przy towrzeniu np widoków
   * konvertuje delta na odpowiednie znaczniki html.
   * @param {string} name - value form quill
   * @param {string} value - delivered from quill
   */
  format(name, value) {
    // compare array value and parm name form quill
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      // console.log('name', name);
      // console.log('value', value);
      if (value) {
        if (this.domNode.hasChildNodes()) {
          let children = this.domNode.childNodes;
          for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName !== "#text") {
            // console.log('children[i] format', children[i].nodeName);
            if (children[i].nodeName === "SPAN" &&
               (name === "style" || name === "src")) {
              children[i].firstChild.setAttribute(name, value);
            } else {
              children[i].firstChild.removeAttribute(name);
            }
            // if (children[i].nodeName !== "A") {
            //   children[i].setAttribute(name, value);
            // } else {
            //   children[i].removeAttribute(name);
            // }
            }
            //   this.domNode.setAttribute(name, value);
            // } else {
            //   this.domNode.removeAttribute(name);
            // }
          }
        }
      }
    } else {
      super.format(name, value);
    }
  }
}

// lista
const ImageFormatAttributesList = [
  // "alt",
  // "height",
  // "width",
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
