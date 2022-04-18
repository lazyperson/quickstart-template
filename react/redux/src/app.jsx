import React from 'react';
import ReactDOM from 'react-dom';

import Routers from './routers';

ReactDOM.render(
	<Routers />,
	document.querySelector('#root')
);

// if (module.hot) {
// 	module.hot.accept();
// }
