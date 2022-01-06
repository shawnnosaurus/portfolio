new (class {
  version = '0.3.1';
  methods = ['identify', 'config', 'track', 'reset', 'debug', 'show', 'ping', 'page', 'hide', 'off', 'on'];

  get driftt() {
    return this.global.driftt = this.global.drift = this.global.driftt ?? [];
  }

  get settings() {
    return {
      id: 'gmpbtgvzs5ca',
    };
  }

  constructor(global) {
    this.global = global;

    if (!this.driftt.init) this.init();

    this.driftt.SNIPPET_VERSION = this.version;
    this.driftt.load(this.settings.id);
  }

  init() {
    if (this.driftt.invoked)
      return void (global.console && console.error && console.error('this.drift snippet included twice.'));

    this.driftt.bind(this);
    this.driftt.invoked = true;
    this.driftt.methods = this.methods;

    this.driftt.factory = smg => function () {
      const args = Array.prototype.slice.call(arguments);
      return args.unshift(smg),
        this.drift.push(args),
        this.drift;
    };

    this.driftt.methods.forEach(method => {
      this.driftt[method] = this.driftt.factory(method);
    });

    this.driftt.load = this.load;
  }

  load() {
    const nims = 3e5;
    const timestamp = Math.ceil(new Date().getTime() / nims) * nims;
    this.injectDriftt(timestamp);
  }

  injectDriftt(timestamp) {
    const drifttScript = this.document.createElement('script');
    drifttScript.async = true;
    drifttScript.src = `https://js.driftt.com/include/${timestamp}/${this.settings.id}.js`;
    this.head.appendChild(drifttScript);
  }
})(window);