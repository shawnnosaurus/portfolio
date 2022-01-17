new (class {
  get document() {
    return this.global.document;
  }

  get head() {
    return this.document.head;
  }

  /**
   * @type {HTMLBodyElement}
   * @readonly
   */
  get body() {
    return this.document.body;
  }

  get settings() {
    return {
      id: 'G-PM8G45JFV1',
    };
  }

  get dataLayer() {
    return this.global.dataLayer ??= [];
  }

  get hasBeenAccepted() {
    return !!this.global.localStorage.getItem('ga_accepted');
  }

  set hasBeenAccepted(v) {
    this.global.localStorage.setItem('ga_accepted', v);
  }

  /**
   * Anonymous class, to control scoping.
   *
   * @param global {Window}
   */
  constructor(global) {
    if (global.document.location.host !== 'shawngenlloud.com') return;
    this.global = global;
    this.addNoticeWhileUnaccepted();
    this.injectGoogleTagManager();
    this.global.gtag ??= this.trace('js', new Date())('config', this.settings.id);
  }

  addNoticeWhileUnaccepted = () => {
    const id = 'ga-notice';
    let gaNotice = this.document.querySelector(`aside#${id}`);

    if (this.hasBeenAccepted || gaNotice) return;

    gaNotice = this.document.createElement('aside');
    gaNotice.id = id;
    gaNotice.setAttribute('style', 'position:fixed;bottom:0;top:auto;width:65vw;height:auto;right:auto;color:white !important;backdrop-filter:blur(5px);padding:3rem;background:rgb(35,35,35,0.75)');

    const btnAccept = this.document.createElement('button');
    btnAccept.textContent = "Ok";
    btnAccept.setAttribute('style', 'width:20rem;margin-right:3rem;padding:1rem');
    btnAccept.addEventListener('click', _ => this.hasBeenAccepted = !gaNotice.remove());
    gaNotice.appendChild(btnAccept);
    const paragraph = this.document.createElement('p');
    paragraph.innerHTML += `
      <strong>Notice.</strong> shawngenlloud.com uses Google Analytics to improve the experience and analyze traffic.
      By using this site, you agree to <a target="_blank" href="https://policies.google.com/privacy#infocollect" 
      style="color:white;text-decoration: underline !important;">Google's Privacy Policy</a> and cookies usage.
    `;
    gaNotice.appendChild(paragraph);
    this.body.insertBefore(gaNotice, this.body.firstChild);
  }

  injectGoogleTagManager = () => {
    const tagManagerScript = this.document.createElement('script');
    tagManagerScript.async = true;
    tagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.settings.id}`;
    this.head.appendChild(tagManagerScript);
  }

  trace = function () {
    this.dataLayer.push(arguments);
    return this.trace;
  }.bind(this);
})(window);