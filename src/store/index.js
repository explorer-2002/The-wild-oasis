import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Only persist user slice
    version: 1,
};

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here as your app grows
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: import.meta.env.VITE_BASE_NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Export types for TypeScript (optional but recommended)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;