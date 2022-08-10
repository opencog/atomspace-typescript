import React from "react";
import {Handle, Position} from "react-flow-renderer";



const RectangleNode = ({ data }: any) => {
    return (
        <div className={getNodeSuperType(data.atomType)} >
            <Handle
                type="target"
                position={Position.Left}
                id={`${data.id}.left`}
                style={{ borderRadius: 0 }}
            />
            <div>{data.label}</div>
            <div>{data.info}</div>
            <Handle
                type="source"
                position={Position.Right}
                id={`${data.id}.right1`}
                style={{ top: "30%", borderRadius: 0 }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${data.id}.right2`}
                style={{ top: "70%", borderRadius: 0 }}
            />
        </div>
    );
};

const CircleNode = ({ data }: any) => {
    return (
        <div className={getLinkSuperType(data.atomType)}>
            <Handle
                type="target"
                position={Position.Top}
                style={{ borderRadius: 0}}
            />
            <div id={data.id} className="circle-node-text">
                {data.label}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ borderRadius: 0}}
            />
        </div>
    );
};



export const TextNode = ({ data }: any) => {
    return (
        <div style={{ background: "transparent", padding: "14px" }}>
            <div id={data.id}>{data.label}</div>
        </div>
    );
};

export const nodeTypes = {
    circle: CircleNode,
    rectangle: RectangleNode,
    text: TextNode
};

const getNodeSuperType = (typeName: string) => {
    let superTypeName = "Node"

    switch(typeName) {
        case "ConceptNode":
            superTypeName = "ConceptNode";
            break;
        case "NumberNode":
            superTypeName = "NumberNode";
            break;
        case "PredicateNode":
        //PredicateNode subtypes
        case "LexicalNode":
        case "Direction":
        case "ConnectorDir":
        case "Bond":
        case "TypeNode":
        case "TagNode":
        case "TypeInhNode":
        case "TypeCoInhNode":
        case "DefinedTypeNode":
        case "StorageNode":
        case "PostgresStorageNode":
        case "FileStorageNode":
        case "MonoStorageNode":
        case "RocksStorageNode":
        case "CogSimpleStorageNode":
        case "CogStorageNode":
        case "ItemClassNode":
        case "DefinedPredicateNode":
        case "GroundedPredicateNode":
            superTypeName = "PredicateNode"
            break;
        case "AnyNode":
        //AnyNode subtypes
        case "VariableNode":
        case "GlobNode":
            superTypeName = "AnyNode"
            break;
        case "AnchorNode":
            superTypeName = "AnchorNode"
            break;
        case "ProcedureNode":
        //ProcedureNode subtypes
        case "GroundedProcedureNode":
        case "GroundedSchemaNode":
        //case "GroundedPredicateNode":
        case "SchemaNode":
        case "DefinedSchemaNode":
        //case "GroundedSchemaNode":
            superTypeName = "ProcedureNode"
            break;
        default:
            superTypeName = "Unknown"
    }
    return superTypeName
}

const getLinkSuperType = (typeName:string) => {
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
