'use strict';

var web = require('solid-js/web');

const App = props => {
  return <div>
      <header>
        <p>
          Sample render of page with <b>{props.id}</b>
        </p>
        <a href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer">
          Learn Solid
        </a>
      </header>
    </div>;
};

// entry point for server render
var index = (async req => {
  return await web.renderToStringAsync(() => web.createComponent(App, {
    get id() {
      return req.id;
    }
  }));
});

module.exports = index;
