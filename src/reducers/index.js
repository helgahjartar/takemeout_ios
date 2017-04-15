import { combineReducers } from "redux";
import registration from "./registration";
import userAuth from "./userAuth"

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        registration: registration,
        userAuth: userAuth
    });
}
