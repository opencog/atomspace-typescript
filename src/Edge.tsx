import React, {CSSProperties} from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import TypesClasses, {DefaultClass, TypesClass } from "./EdgeTypesStyle";
import {Position} from "react-flow-renderer/dist/esm/types/utils";

interface CustomEdgeInterface {
    id: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    sourcePosition: Position,
    targetPosition: Position,
    style: CSSProperties,
    data: any,
    markerEnd: string
}

const CustomEdge = ({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       data,
                                       markerEnd,
                                   }: any) => {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    let typeClass: TypesClass | undefined = TypesClasses.get(data.atomType);
    //console.log(atomType.toString())
    //console.log(atomType.toString())
    if(!typeClass){
        typeClass = DefaultClass;
    }


    return (
        <>
            <path
                id={id}
                style = {typeClass.class}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />

        </>
    );
}

export const edgeTypes = {
    colored: CustomEdge,
};

const getLinkSuperType = (typeName: string) => {
    let superTypeName = "Link";

    switch(typeName) {
        case "OrderedLink":
        case "ListLink":
        case "SetDifferenceLink":
        case "MemberLink":
        case "SubsetLink":
        case "ContextLink":
        case "TrueLink":
        case "FalseLink":
        case "SequentialAndLink":
        case "SequentialOrLink":
        case "ChoiceLink":
        case "Section":
        case "TagLink":
        case "QuoteLink":
        case "UnquoteLink":
        case "LocalQuoteLink":
        case "DontExecLink":
        case "ReplacementLink":
        case "FreeLink":
        case "IntervalLink":
        case "ImplicationLink":
        case "InheritanceLink":
        case "AssociativeLink":
        case "ExecutionLink":
            superTypeName = "OrderedLink";
            break;
        case "UnorderedLink":
            superTypeName = "UnorderedLink";
            break;
        case "EvaluatableLink":
            superTypeName = "EvaluatableLink";
            break;
        case "NumericOutputLink":
            superTypeName = "NumericOutputLink";
            break;
        case "BooleanLink":
            superTypeName = "BooleanLink";
            break;
        case "NumericInputLink":
            superTypeName = "NumericInputLink";
            break;
        case "TypeInputLink":
            superTypeName = "TypeInputLink";
            break;
        case "TypeOutputLink":
            superTypeName = "TypeOutputLink";
            break;
        case "AlphaConvertibleLink":
            superTypeName = "AlphaConvertibleLink";
            break;
        case "CollectionLink":
            superTypeName = "CollectionLink";
            break;
        case "ForeignAst":
            superTypeName = "ForeignAst";
            break;
        case "DirectlyEvaluatableLink":
            superTypeName = "DirectlyEvaluatableLink";
            break;
        default:
            superTypeName = "Unknown"
    }
    return "circle-node " + superTypeName;
}
