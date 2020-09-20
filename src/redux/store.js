import { createStore } from "redux";
import rootReducers from "./reducer/rootReducers";

const store = createStore(rootReducers);

export default store;
