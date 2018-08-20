import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App,{Board, Square,App2} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App2 />, document.getElementById('root2'));
ReactDOM.render(<Board />, document.getElementById('root1'));
registerServiceWorker();

if(module.hot){
    module.hot.accept()
}