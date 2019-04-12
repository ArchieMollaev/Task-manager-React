import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import 'styles/main.scss';

ReactDOM.render(<App compiler="TypeScript" framework="React" />, document.getElementById('root'));
