new (class {
  get document() {
    return this.global.document;
  }

  get head() {
    return this.document.head;
  }

  /**
   * @type {({ hjid: number, hjsv: number })}
   * @readonly
   */
  get settings() {
    return this.global._hjSettings ??= {
      hjid: 2771740,
      hjsv: 6
    };
  }

  /**
   * @type {(any[])}
   * @readonly
   */
  get heatMap() {
    return this.global.hj.q ??= [];
  }

  /**
   * Anonymous class, to manage scoping and share global context.
   *
   * @param global {Window}
   */
  constructor(global) {
    if (global.document.location.host !== 'shawngenlloud.com') return;
    this.global = global;
    this.injectHotjar();
    this.global.hj ??= this.trace;
  }

  injectHotjar = () => {
    const hotjarScript = this.document.createElement('script');
    hotjarScript.async = true;
    hotjarScript.src = `https://static.hotjar.com/c/hotjar-${this.settings.hjid}.js?sv=${this.settings.hjsv}`;
    this.head.appendChild(hotjarScript);
  }

  trace = function () {
    this.heatMap.push(arguments);
  }.bind(this);
})(window);