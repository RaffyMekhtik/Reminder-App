import { createStore } from "redux";
import rootReducer from "./Reducers";

export const configureStore = () => {
    const store = createStore(
        rootReducer
    )
    return store
}