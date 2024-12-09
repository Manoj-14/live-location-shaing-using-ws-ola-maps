import persistReducer from "redux-persist/es/persistReducer";
import locationSliceReducer from "./slice/locationSlice";
import userSliceReducer from "./slice/userSlice";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

const locationPersistConfig = {
    key: "location",
    storage
}
const userPersistConfig = {
    key: "user",
    storage
}

const locationPersitReducer = persistReducer(
    locationPersistConfig,
    locationSliceReducer
)
const userPersistReducser = persistReducer(
    userPersistConfig,
    userSliceReducer
)

export const store = configureStore({
    reducer: { location: locationPersitReducer, user: userPersistReducser },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export const persistor = persistStore(store);
export * from "./slice/locationSlice";
export * from "./slice/userSlice"