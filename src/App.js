import React from 'react';
import css from 'styled-jsx/css';

const style = css`
  .title {
    color: red;
  }
`;

const title = 'React with Webpack + Babel + styled jsx gooooo';

const App = () => (
  <div>
    <h1 className="title">{title}</h1>
    <style jsx>{style}</style>
  </div>
);

export default App;
