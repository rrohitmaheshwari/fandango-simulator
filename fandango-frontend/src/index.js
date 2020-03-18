import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import { store }    from './helper/store/store';
import App          from './app/App';
import './index.css';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root')
);
