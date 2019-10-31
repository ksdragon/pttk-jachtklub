import Quill from "quill";
const InlineLink = Quill.import("blots/inline");

/**
 * Class which create routelink blots
 */
class RouteLink extends InlineLink {
  /**
   *
   * @param {*} value
   */
  static create(value) {
    const node = super.create(value);
    value = this.sanitize(value);
    node.setAttribute("routerLink", value);
    node.setAttribute("rel", "noopener noreferrer");
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

RouteLink.blotName = "routerLink";
RouteLink.tagName = "A";
RouteLink.SANITIZED_URL = "about:blank";
RouteLink.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];

function sanitize(url, protocols) {
  const anchor = document.createElement("a");
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
  return protocols.indexOf(protocol) > -1;
}
Quill.register(RouteLink);
