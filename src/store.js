import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise-middleware';
import thunk from "redux-thunk";
import getRootReducer from "./reducers";

export default function getStore(navReducer) {
    const store = createStore(
        getRootReducer(navReducer),
        applyMiddleware(thunk, promiseMiddleware())
    );
    return store;
}
