class LinkPatcher {

  constructor() {

  }

  getAllExternalLinks() {
    return Array.from(document.querySelectorAll('a[href]'))
      .filter(link => this.isExternalLink(link));
  }

  isExternalLink(link) {
    return (link.host !== window.location.host);
  }

  fixLinks(links) {
    return links.forEach(this.fixLink);
  }

  fixLink(link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');

    return link;
  }
}

// Autopatch when importing.
const patcher = new LinkPatcher();
const external = patcher.getAllExternalLinks();

patcher.fixLinks(external);
console.log('hello');

export { patcher };
