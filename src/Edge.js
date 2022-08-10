import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

export default function CustomEdge({
                                       id,
                                       source,
                                       target,
                                       data,
                                   }) {
    const edgePath = getBezierPath({
        source,
        target,
    });

    return (
        <>
            <path
                id={id}
                style={{stroke: "red"}}
                d={edgePath}
            />
        </>
    );
}
const getLinkSuperType = (typeName) => {
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
