// Create Action Constants
import {APICommands, AtomBase} from "../../services/OpenCogAPI";
import {TypesClass} from "../../util/EdgeTypesStyle";

export enum AtomspaceVisualizerActionTypes {
    SET_TYPES = "SET_TYPES",
}

/// Action interface
export interface IAtomspaceVisualizerSetTypesClassesAction  {
    type: AtomspaceVisualizerActionTypes.SET_TYPES;
    typesClasses: Map<string, TypesClass>
}

// Action creator function
export const AtomspaceVisualizerSetTypesClassesAction = (typesClasses: Map<string,TypesClass>) => {
    return {
        type: AtomspaceVisualizerActionTypes.SET_TYPES,
        typesClasses: typesClasses,
    }
}


export type AtomspaceVisualizerActions = IAtomspaceVisualizerSetTypesClassesAction;
