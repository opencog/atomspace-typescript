// Create Action Constants
import {APICommands, AtomBase} from "../../services/OpenCogAPI";

export enum OpenCogJSONAPIActionTypes {
   SET_FETCHING = "SET_FETCHING",
   SET_ATOMS = "SET_ATOMS",
   SET_TYPES = "SET_TYPES",
   SET_JSON_API_VERSION = "SET_JSON_API_VERSION",
}

/// Action interface
export interface IOpenCogSetFetchingAction  {
   type: OpenCogJSONAPIActionTypes.SET_FETCHING;
   command?: APICommands;
   isFetching?: boolean;
}

// Action creator function
export const OpenCogSetFetchingAction = (isFetching?: boolean, command?: APICommands) => {
   return {
      type: OpenCogJSONAPIActionTypes.SET_FETCHING,
      command: command,
      isFetching: isFetching,
   }
}


export interface IOpenCogSetAtomsAction {
   type: OpenCogJSONAPIActionTypes.SET_ATOMS;
   atoms: AtomBase[];
}

export const OpenCogSetAtomsAction = (atoms: AtomBase[]) => {
   return {
      type: OpenCogJSONAPIActionTypes.SET_ATOMS,
      atoms: atoms,
   }
}

export interface IOpenCogSetTypesAction {
   type: OpenCogJSONAPIActionTypes.SET_TYPES;
   parentTypes: string[];
   subTypes: string[];
}

export const OpenCogSetTypesAction = (parentTypes: string[], subTypes:string[]) => {
   return {
      type: OpenCogJSONAPIActionTypes.SET_TYPES,
      parentTypes: parentTypes,
      subTypes: subTypes
   }
}

export interface IOpenCogSetJSONAPIVersion {
   type: OpenCogJSONAPIActionTypes.SET_JSON_API_VERSION;
   version: string;
}

export const OpenCogSetJSONAPIVersion = (version:string ) => {
   return {
      type: OpenCogJSONAPIActionTypes.SET_JSON_API_VERSION,
      version: version,
   }
}

export type OpenCogJSONAPIActions =
    IOpenCogSetAtomsAction
    | IOpenCogSetTypesAction
    | IOpenCogSetJSONAPIVersion
    | IOpenCogSetFetchingAction;
