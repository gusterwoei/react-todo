import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoListPage from './components/todo-list-page/todo-list-page';
import TodoDetailPage from './components/todo-detail-page/todo-detail-page';

ReactDOM.render(
	<Router>
		<div className=''>
			<Route exact={true} path="/" component={TodoListPage} />
			<Route path="/detail" component={TodoDetailPage} />
		</div>
	</Router>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
