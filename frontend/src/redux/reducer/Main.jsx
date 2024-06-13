import { combineReducers } from "redux";
import { cartReducer } from "./Reducer";

const Rooted = combineReducers({
    cartReducer
});

export default Rooted;
