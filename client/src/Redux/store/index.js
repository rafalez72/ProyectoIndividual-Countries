import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
 
 export default store;
 //composeWithDevTools(applyMiddleware(thunk) te ahorra escribir el resto de window y eso