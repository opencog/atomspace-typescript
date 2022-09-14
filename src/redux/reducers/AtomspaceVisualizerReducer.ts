// store/app/reducers.ts
import {Reducer} from 'redux'
import {AtomspaceVisualizerActions, AtomspaceVisualizerActionTypes} from '../actions/AtomspaceVisualizerActions'
import {TypesClass} from "../../util/EdgeTypesStyle";

export interface AtomspaceVisualizerState {
    typesClasses: Map<string,TypesClass>;
}

const initialAtomspaceVisualizerState: AtomspaceVisualizerState = {
    typesClasses: new Map<string,TypesClass>(),
}


export const AtomspaceVisualizerReducer: Reducer<AtomspaceVisualizerState, AtomspaceVisualizerActions> =
    (state: AtomspaceVisualizerState | undefined = initialAtomspaceVisualizerState, action: AtomspaceVisualizerActions) => {
        switch (action.type) {
            case AtomspaceVisualizerActionTypes.SET_TYPES:
                let newTypesClasses = new Map<string,TypesClass>(action.typesClasses);
                return {
                    ...state,
                    typesClasses: newTypesClasses,
                }
        }
        return state
    }
