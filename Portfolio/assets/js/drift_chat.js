"use strict";

!function (global) {
  const placeholderDiv = global.document.createElement('div');
  placeholderDiv.id = 'drift-widget-placeholder';
  placeholderDiv.title = 'Loading chat...';
  placeholderDiv.ariaHidden = true;
  placeholderDiv.tabIndex = -1;
  placeholderDiv.setAttribute('style', 'z-index:1;background:#5c6282;opacity:0.25;position:fixed;right:4vmin;bottom:4vmin;padding:15px;border-radius:50%');
  placeholderDiv.innerHTML += `
    <svg width="25" height="23" viewBox="0 0 25 23">
      <path fill="#ffffff"
        d="M24.516 9.953C24.516 4.453 19.04 0 12.258 0 5.476 0 0 4.452 0 9.953c0 3.318 1.986 6.24 5.05 8.053-.34 2.552-1.815 4.055-1.844 4.084-.14.14-.17.368-.113.567a.524.524 0 0 0 .482.312c2.95 0 5.335-1.93 6.612-3.206.652.086 1.362.142 2.07.142 6.783 0 12.26-4.452 12.26-9.953z" 
      ></path>
    </svg>
  `;
  global.document.body.insertBefore(placeholderDiv, global.document.body.firstChild);

  const hidePlaceholder = () => {
    if (global.document.querySelector('#drift-frame-chat[aria-hidden]')) {
      placeholderDiv.remove();
    } else {
      global.requestAnimationFrame(hidePlaceholder);
    }
  }

  global.requestAnimationFrame(hidePlaceholder);

  var t = global.driftt = global.drift = global.driftt || [];
  if (!t.init) {
    if (t.invoked) return void (global.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = ["identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"],
      t.factory = function (e) {
        return function () {
          var n = Array.prototype.slice.call(arguments);
          return n.unshift(e), t.push(n), t;
        };
      }, t.methods.forEach(function (e) {
        t[e] = t.factory(e);
      }), t.load = function (t) {
        var e = 3e5, n = Math.ceil(new Date() / e) * e, o = global.document.createElement("script");
        o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
        var i = global.document.getElementsByTagName("script")[0];
        i.parentNode.insertBefore(o, i);
      };
  }
  drift.SNIPPET_VERSION = '0.3.1';
  drift.load('gmpbtgvzs5ca');
}(window);