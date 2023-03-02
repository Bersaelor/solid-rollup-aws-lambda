'use strict';

var web = require('solid-js/web');

const _tmpl$ = ["<div", "><header><p>Sample render of page with <b>", "</b></p><a href=\"https://github.com/solidjs/solid\" target=\"_blank\" rel=\"noopener noreferrer\">Learn Solid</a></header></div>"];
function App(props) {
  return web.ssr(_tmpl$, web.ssrHydrationKey(), web.escape(props.id));
}

// entry point for server render
var index = (async req => {
  return await web.renderToStringAsync(() => web.createComponent(App, {
    get id() {
      return req.id;
    }
  }));
});

module.exports = index;
