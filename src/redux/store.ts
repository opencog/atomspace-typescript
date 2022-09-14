// store/index.ts
import {createStore, combineReducers, applyMiddleware, Store, compose} from 'redux'

import thunk from 'redux-thunk'
import {OpenCogJSONAPIReducer,OpenCogJSONAPIState} from "./reducers/OpenCogJSONAPIReducer";
import {AtomspaceVisualizerReducer, AtomspaceVisualizerState} from "./reducers/AtomspaceVisualizerReducer";

export interface RootState {
    openCogState: OpenCogJSONAPIState,
    atomspaceVisualizerState: AtomspaceVisualizerState
}

// Configure store function of type `RootState`
export default function configureStore(): Store<RootState, any> {
    const store = createStore(
        combineReducers<RootState>({
            openCogState: OpenCogJSONAPIReducer,
            atomspaceVisualizerState: AtomspaceVisualizerReducer
        }),
        undefined,
        applyMiddleware(thunk)
        );
    return store;
}
