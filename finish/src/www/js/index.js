import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

//import WidgetToolComponent from './components/widget-tool';

import WidgetToolContainer from './containers/widget-tool-container';
import ViewerRoute from './routes/viewer-route';



//import { getEnumList, getList } from './graphql';

// Promise.all([
// 	getEnumList('Color'),
// 	getEnumList('Size'),
// 	getList('widgets', ['id', 'name', 'description', 'color', 'size', 'quantity', { owner: ['id', 'name'] } ])
// 		.then(results => results.widgets),
// 	getList('users', ['id', 'name']).then(results =>
// 		results.users.map(user => ({ value: user.id, label: user.name })))
// ]).then(results => 

ReactDOM.render(<Relay.RootContainer Component={WidgetToolContainer} route={new ViewerRoute()} />, document.querySelector('main'));

//);

	// return ReactDOM.render(
	// 	<WidgetToolComponent widgets={results[2]} colorList={results[0]}
	// 		sizeList={results[1]} userList={results[3]} />,
	// 	document.querySelector('main'));
