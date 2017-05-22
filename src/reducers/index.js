import { combineReducers } from "redux";
import registration from "./registration";
import userAuth from "./userAuth"
import formSave from "./formSave"

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        registration: registration,
        userAuth: userAuth,
        formSave: formSave
    });
}
