// store/app/reducers.ts
import {Reducer} from 'redux'
import {OpenCogJSONAPIActions, OpenCogJSONAPIActionTypes} from '../actions/OpenCogJSONAPIActions'
import {APICommands, AtomBase} from "../../services/OpenCogAPI";


export interface OpenCogJSONAPIState {
    isFetching: boolean;
    subTypes: string[];
    parentTypes: string[];
    previousCommand: APICommands;
    atoms: AtomBase[];
    JSONAPIVersion: string;
}

const initialOpenCogJSONAPIState: OpenCogJSONAPIState = {
    isFetching: false,
    subTypes: [],
    parentTypes: [],
    atoms: [],
    previousCommand: APICommands.None,
    JSONAPIVersion: "",
}


export const OpenCogJSONAPIReducer: Reducer<OpenCogJSONAPIState, OpenCogJSONAPIActions> =
    (state: OpenCogJSONAPIState | undefined = initialOpenCogJSONAPIState, action: OpenCogJSONAPIActions) => {
    switch (action.type) {
        case OpenCogJSONAPIActionTypes.SET_FETCHING:
            return {
                ...state,
                previousCommand: action.command? action.command : state.previousCommand,
                isFetching: action.isFetching === undefined ? false : action.isFetching,
            }
        case OpenCogJSONAPIActionTypes.SET_JSON_API_VERSION:
            return {
                ...state,
                JSONAPIVersion: action.version,
            }
        case OpenCogJSONAPIActionTypes.SET_ATOMS:
            let newArray:AtomBase[] = new Array<AtomBase>();
            newArray.push(...action.atoms);
            return {
                ...state,
                atoms: newArray,
            }
        case OpenCogJSONAPIActionTypes.SET_TYPES:
            return {
                ...state,
                parentTypes: action.parentTypes,
                subTypes: action.subTypes,
            }
    }
    return state
}
