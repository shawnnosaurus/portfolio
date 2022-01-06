new (class {
  trace = function () {
    this.dataLayer.push(arguments);
    return this.trace;
  }.bind(this);

  get document() {
    return this.global.document;
  }

  get head() {
    return this.document.head;
  }

  get settings() {
    return {
      id: 'G-PM8G45JFV1',
    };
  }

  get dataLayer() {
    return this.global['dataLayer'] ??= [];
  }

  constructor(global) {
    if (global.document.location.host !== 'shawngenlloud.com') return;
    this.global = global;
    this.injectGoogleTagManager();
    this.global['gtag'] ??= this.trace('js', new Date())('config', this.settings.id);
  }

  injectGoogleTagManager() {
    const tagManagerScript = this.document.createElement('script');
    tagManagerScript.async = true;
    tagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.settings.id}`;
    this.head.appendChild(tagManagerScript);
  }
})(window);