new (class {
  trace = function () {
    this.heatMap.push(arguments)
  }.bind(this);
  
  get document() {
    return this.global.document;
  }

  get head() {
    return this.document.querySelector('head');
  }

  get settings() {
    return this.global._hjSettings ??= {
      hjid: 2771740,
      hjsv: 6
    };
  }

  get heatMap() {
    return this.global.hj.q ??= [];
  }

  constructor(global) {
    if (global.document.location.host !== 'shawngenlloud.com') return;
    this.global = global;
    this.injectHotjar();
    global.hj ??= this.trace;
  }

  injectHotjar() {
    const hotjarScript = this.document.createElement('script');
    hotjarScript.async = true;
    hotjarScript.src = `https://static.hotjar.com/c/hotjar-${this.settings.hjid}.js?sv=${this.settings.hjsv}`;
    this.head.appendChild(hotjarScript);
  }
})(window);