import {createStore} from "redux";
import Rooted from "./redux/reducer/Main";

const Store=createStore(
    Rooted
);

export default Store;