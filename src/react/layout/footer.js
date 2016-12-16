/**
 * @module Footer
 * @memberof lux-react/layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../componentRegistry';

const content = (<p>
  Pages generated by
  <a className="link--plain" href="https://GitHub.com/luxui">Luxui</a>
  ENGINEERED to Amaze, by
  <a className="link--plain" href="http://quickenloans.com">Quicken Loans</a>
</p>);

function footerComponent() {

  return (
    <footer role="contentinfo">
      {content}
    </footer>
  );
}
footerComponent.propTypes = {
};

registry('Footer', footerComponent);