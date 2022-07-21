import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["latlngReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  middleware: [thunk],
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;
