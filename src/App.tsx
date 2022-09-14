import React, {useCallback, useEffect, useRef, useState} from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {TableFooter} from "@mui/material";
import {APICommands, OpenCogAPI} from "./services/OpenCogAPI";
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    ControlButton,
    Controls,
    Edge,
    EdgeChange,
    FitViewOptions,
    Node,
    NodeChange,
    ReactFlowProvider,
    useReactFlow
} from "react-flow-renderer";
import {getLayoutedElements} from "./util/Layout";
import "./css/edgeStyles.css"
import TypesClasses, {SeedColors, TypesClass} from "./util/EdgeTypesStyle";
import {ReactComponent as AtomIcon} from './icons/atom-bold.svg';

import Legend from "./components/Legend/Legend";
import LinkTypeDialog from "./components/LinkTypeDialog/LinkTypeDialog";
import NodeAtomNode from "./components/NodeAtomNode/NodeAtomNode";
import LinkAtomNode from "./components/LinkAtomNode/LinkAtomNode";
import LinkAtomEdge from "./components/LinkAtomEdge/LinkAtomEdge";
import {generateTypeClassMap} from "./App.controller";
import {AtomspaceVisualizerSetTypesClassesAction} from "./redux/actions/AtomspaceVisualizerActions";
import {RootState} from "./redux/store";

export const atomNodeTypes = {
    linkAtomNode: LinkAtomNode,
    nodeAtomNode: NodeAtomNode
};

export const atomLinkTypes = {
    linkAtomEdge: LinkAtomEdge
}

export const App = ()=> {
    const dispatch = useDispatch();
    const reactFlowInstance = useReactFlow();
    const TypesClasses = useSelector((state:RootState) => state.atomspaceVisualizerState.typesClasses);
    const [isConnected, setIsConnected] = useState(false);
    const [sendReadyState, setSendReadyState] = useState(false);
    const [consoleLines, setConsoleLines] = useState([""]);
    const [inputtedMessage, setInputtedMessage] = useState('');
    const [linkParentTypes, setLinkParentTypes] = useState<string[]>([])
    const [nodeParentTypes, setNodeParentTypes] = useState<string[]>([])
    const [linkChildLookup, setLinkChildLoopup] = useState(new Map<string,string>())
    const [nodeChildLookup, setNodeChildLoopup] = useState(new Map<string,string>())
    //Note this is not the most efficient way to store these, but it does allow for efficient querying of supertypes

    const tinycolor = require("tinycolor2");

    const [command, setCommand] = useState(APICommands.None);
    let nodeCount = 3;
    const bottomRef = React.useRef<HTMLDivElement>(null);

    const initialNodes: Node[] = [
    ];

    const initialEdges: Edge[] = [
    ];

    const fitViewOptions: FitViewOptions = {
        padding: 0.2
    }
    const [makeAtomsState, setMakeAtomsState] = useState<AtomBase[]>([]);
    const [nodes, setNodesState] = useState<Node[]>(initialNodes);
    const [edges, setEdgesState] = useState<Edge[]>(initialEdges);
    const initialMakeEdgeState = {source:{type:""},target:{type:""}};
    const [makeEdgeState, setMakeEdgeState] = useState<{ source: AtomBase, target: AtomBase }>(initialMakeEdgeState);

    const [selectLinkType, setSelectLinkType] = useState({
        open: false,
        value: "ListLink",
    })

    const addConsoleLine = (newLine: string) => {
        setConsoleLines(state => [ ...state,newLine])
    }

    OpenCogAPI.getSocket().onopen = () => {
        console.log("WS Connected")
        setIsConnected(true)
        setSendReadyState(true);
        buildTypesAndStyles()

    }

    const buildTypesAndStyles = async () => {
        let nodeSuperTypes = await getNodeTypes();
        let linkSuperTypes = await getLinkTypes();
        let types = generateTypeClassMap(nodeSuperTypes,linkSuperTypes);
        dispatch(AtomspaceVisualizerSetTypesClassesAction(types));
    }

    const getNodeTypes = async ()  => {
        let returnedNodeParentTypes = await OpenCogAPI.getSubTypes(addConsoleLine, "Node", false)
        setNodeParentTypes(returnedNodeParentTypes);
        let buildNodeChildLookup = new Map<string, string>();
        for (let parentType of returnedNodeParentTypes) {
            buildNodeChildLookup.set(parentType, parentType)
            let allDescendantTypes = await OpenCogAPI.getSubTypes(addConsoleLine, parentType, true)
            allDescendantTypes.forEach(childType => {
                buildNodeChildLookup.set(childType, parentType);
            })
        }
        setNodeChildLoopup(buildNodeChildLookup)
        return returnedNodeParentTypes
    }
    const getLinkTypes = async () => {
        let returnedLinkParentTypes = await OpenCogAPI.getSubTypes(addConsoleLine, "Link", false);
        setLinkParentTypes(returnedLinkParentTypes);
        let buildLinkChildLookup = new Map<string,string>();
        for(let parentType of returnedLinkParentTypes){
            buildLinkChildLookup.set(parentType,parentType)
            let allDescendantTypes = await OpenCogAPI.getSubTypes(addConsoleLine, parentType, true)
            allDescendantTypes.forEach(childType => {
                buildLinkChildLookup.set(childType,parentType);
            })
        }
        setLinkChildLoopup(buildLinkChildLookup)
        return returnedLinkParentTypes
    }


    const checkColors = () =>{
        TypesClasses.forEach((value,key) => {
            if(value.class.background) {
                console.log(`Type: ${key} + ${value.class.background}`)
            }
            else {
                console.log(`Type: ${key} + ${value.class.stroke}`)
            }

        })
    }

    const setNodes = (nodes: Node[]) => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setNodesState(layoutedElements.nodes);
    };
    const setEdges = (edges: Edge[]) => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setEdgesState(layoutedElements.edges);
    };

    const onNodeMouseEnter = useCallback((event: React.MouseEvent, node: Node) => {
        console.log(node.data.atomType)
        },
        []
    )

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes(applyNodeChanges(changes, nodes)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges(applyEdgeChanges(changes, edges)),
        [setEdges]
    );

    const onConnect = useCallback(
        (connection: Connection) => {
            let filteredSource = nodes.filter(node => node.id === connection.source)
            let filteredTarget = nodes.filter(node => node.id === connection.target)
            if(filteredSource.length > 1 || filteredTarget.length > 1){
                console.log("More than one node match");
            }
            else if(filteredSource.length === 0 || filteredTarget.length === 0){
                console.log("No node data");
            }
            else if(filteredSource[0].type === "linkNode" || filteredTarget[0].type === "linkNode"){
                console.log("A link was selected")
            }
            else{
                setMakeEdgeState({source: filteredSource[0].data.atomObj, target: filteredTarget[0].data.atomObj})
                setSelectLinkType({open:true,value:selectLinkType.value})
            }

        },

        [setNodes]
    );

    const handleSelectLinkTypeClose = (selectionConfirmed: boolean,linkTypeSelection: string ) => {
        setSelectLinkType({ open: false,value: linkTypeSelection });
        if(selectionConfirmed){
            createLinkAndGetAtomSpace(linkTypeSelection)
        }
    };

    const createLinkAndGetAtomSpace = async (linkType: string) => {
        if(makeEdgeState.source.type !== ""){
            OpenCogAPI.addLink(addConsoleLine,linkType,[makeEdgeState.source,makeEdgeState.target]).then(()=>{
                setMakeEdgeState(initialMakeEdgeState);
                setCommand(APICommands.GetAllAtoms);
            })
        }
    }


    const ViewportLogger = () => {
        const { x, y, zoom } = reactFlowInstance.getViewport()


            console.log(x, y, zoom);


        return null;
    }

    const makeDummyNodes = useCallback(() => {
        let newNode = { id: `${nodeCount}`, data: { label: `Node ${nodeCount}` }, position: { x: 100, y: 100 } };
        nodeCount++;
        reactFlowInstance.addNodes(newNode)
    }, []);

    const setAtoms = useCallback((atoms: AtomBase[]) => {
        let linkAtoms = atoms.filter(atom => atom.type.includes("Link"))
        let nodeAtoms = atoms.filter(atom => atom.type.includes("Node"))
        let newNodes: Node[] = [];
        let newEdges: Edge[] = [];
        nodeAtoms.forEach((atom:AtomBase, index:number, array:AtomBase[])=>{
            let newNode = { id: `${atom.name}`, type: "nodeAtomNode", data: { label: `Name: ${atom.name}`, info: `Type: ${atom.type}`, atomType: atom.type, atomObj: atom }, position: { x: 100, y: 100 }};
            newNodes.push(newNode);
        });
        (linkAtoms as AtomLink[]).forEach((link:AtomLink, index:number, array:AtomBase[])=>{
            let linkId = `${link.type}:${link.outgoing[0].name},${link.outgoing[1].name}`
            console.log("Link Child Type: "+linkChildLookup.get(link.type))
            let newNode = { id: linkId, type: "linkAtomNode" ,data: { label: `${link.type}, Links: ${link.outgoing.length}`, atomType: linkChildLookup.get(link.type), atomObj: link}, position: { x: 100, y: 100 }};
            link.outgoing.forEach((linkNode, index:number )=> {

                    let newEdge = { id: `${index}${linkId}`, type: "linkAtomEdge", source: linkId, target: `${linkNode.name}`, data: {atomType: linkChildLookup.get(link.type)}};
                    newEdges.push(newEdge);

                })
            newNodes.push(newNode);
        });
        reactFlowInstance.setNodes(newNodes);
        reactFlowInstance.setEdges(newEdges);
    }, [linkChildLookup]);

    interface AtomBase {
        type: string;
        name?: string;
        outgoing?: AtomBase[];
    }
    interface AtomLink extends AtomBase{
        type: string;
        outgoing: AtomBase[];
    }

    useEffect(() => {
        switch (command){
            case APICommands.SendRawString:
                console.log("Command: "+command)
                OpenCogAPI.sendRawString(addConsoleLine,inputtedMessage);
                setCommand(APICommands.None);
                break;
            case APICommands.GetJsonVersion:
                console.log("Command: "+command)
                getJsonVersion();
                setCommand(APICommands.None);
                break;
            case APICommands.GetAllAtoms:
                console.log("Command: "+command)
                getAllAtoms()
                setCommand(APICommands.None)
                break;
            case APICommands.MakeAtom:
                console.log("Command: "+command);
                makeAtom();
                setCommand(APICommands.None);
                break;
            case APICommands.LoadAtoms:
                console.log("Command: "+command);
                loadAtoms();
                setCommand(APICommands.None);
                break;
            case APICommands.HaveAtom:
                console.log("Command: "+command);
                haveAtom();
                setCommand(APICommands.None);
                break;
            case APICommands.HaveNode:
                console.log("Command: "+command);
                haveNode();
                setCommand(APICommands.None);
                break;
            case APICommands.HaveLink:
                console.log("Command: "+command);
                haveLink();
                setCommand(APICommands.None);
                break;
            case APICommands.GetIncoming:
                console.log("Command: "+command);
                getIncoming();
                setCommand(APICommands.None);
                break;
            case APICommands.ExecuteAtom:
                console.log("Command: "+command);
                executeAtom();
                setCommand(APICommands.None);
                break;
        }
        bottomRef.current?.scrollIntoView();

    }, [command]);

    const getAllAtoms = async () => {
        let newAtoms: AtomBase[] = await OpenCogAPI.getAllAtoms(addConsoleLine);
        if(newAtoms) {
            setAtoms(newAtoms)
            console.log("Atoms Retrieved: "+newAtoms.length)
        }
        else{
            console.log("Atoms Retrieved: None")
        }
    }

    const makeAtom = async () => {
        let success = await OpenCogAPI.makeAtom(addConsoleLine,{"type": "ConceptNode", "name": "bar"});
        console.log("Succeeded: "+success);
    }

    const loadAtoms = async () => {
        let success = await OpenCogAPI.loadAtoms(addConsoleLine,[{"type": "ConceptNode", "name": "baz"},{"type": "ConceptNode", "name": "qux"}]);
        console.log("Succeeded: "+success);
    }

    const haveAtom = async () => {
        let success = await OpenCogAPI.haveAtom(addConsoleLine,{"type": "ConceptNode", "name": "baz"});
        console.log("Succeeded: "+success);
    }

    const haveNode = async () => {
        let success = await OpenCogAPI.haveNode(addConsoleLine,{"type": "ConceptNode", "name": "baz"});
        console.log("Succeeded: "+success);
    }

    const haveLink = async () => {
        let success = await OpenCogAPI.haveLink(addConsoleLine,{ "type": "ListLink", "outgoing": [ { "type": "ConceptNode", "name": "foo" }, { "type": "ConceptNode", "name": "bar" }]});
        console.log("Succeeded: "+success);
    }

    const getIncoming = async () => {
        let response = await OpenCogAPI.getIncoming(addConsoleLine,{"type": "ConceptNode", "name": "bar"});
        console.log("Atoms Retrieved: "+response.length)
    }

    const executeAtom = async () => {
        let response = await OpenCogAPI.executeAtom(addConsoleLine,{ "type": "PlusLink", "outgoing":[{"type": "NumberNode", "name": "2"},{"type": "NumberNode", "name": "2"}]});
        if(response) {
            console.log("Atom Executed")
        }
        else{
            console.log("Atom failed to execute")
        }
    }

    const getJsonVersion = async () => {
        let response = await OpenCogAPI.getJsonVersion(addConsoleLine);
        console.log("JSON Version: "+response);
    }

    // Dialog
    const [isLinkTypeDialogOpen, setIsLinkTypeDialogOpen] = React.useState<boolean>(false);
    // Dialog

    return (
        <div>
            <div style={{ width:"1000px" }}>
                <TableContainer style={{ height: 300, maxWidth:1000}}>
                    <Table sx={{ minWidth: 980}} size="small" aria-label="a dense table">
                        <TableHead sx = {{py:0}}>
                            <TableRow>
                                <TableCell>telnet output - Connected: {String(isConnected)}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {consoleLines.map((row, index) => (
                                <TableRow
                                    key={index}

                                >
                                    <TableCell sx = {{fontStyle: 'arial', py: 0, borderColor: 'white'}} component="th" scope="row" >
                                        {row}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            {'_'}
                            <div className="bottomContainerElement" ref={bottomRef} />
                        </TableFooter>
                    </Table>

                </TableContainer>
                <div>
                    <input
                        type={'text'}
                        value={inputtedMessage}
                        onChange={(e) => setInputtedMessage(e.target.value)}
                        style={{ width:"900px" }}
                    />
                    <button
                        onClick={() => {
                            if(inputtedMessage != "") {
                                setCommand(APICommands.SendRawString)
                            }
                            else{
                                console.log("RawString Empty")
                            }
                        }}
                        disabled={!sendReadyState}
                        style={{ width:"90px" }}

                    >
                        Send
                    </button>
                </div>
                <button
                    onClick={event => setCommand(APICommands.GetAllAtoms)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Get Atoms
                </button>
                <button
                    onClick={makeDummyNodes}
                    style={{ width:"110px" }}
                >
                    Make Dummy Nodes
                </button>
                <button
                    onClick={event => setCommand(APICommands.LoadAtoms)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Make Atoms
                </button>
                <button
                    onClick={event => setCommand(APICommands.MakeAtom)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Make Atom
                </button>
                <button
                    onClick={event => setCommand(APICommands.HaveAtom)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Have Atom
                </button>
                <button
                    onClick={event => setCommand(APICommands.HaveNode)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Have Node
                </button>
                <button
                    onClick={event => setCommand(APICommands.HaveLink)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Have Link
                </button>
                <button
                    onClick={event => setCommand(APICommands.GetJsonVersion)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Get Version
                </button>
                <button
                    onClick={event => setCommand(APICommands.GetIncoming)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Get Incoming
                </button>
                <button
                    onClick={event => setCommand(APICommands.ExecuteAtom)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Execute Atom
                </button>
                <button
                    onClick={event => checkColors()}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Check Colors
                </button>
                <button
                    onClick={ViewportLogger}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    ViewportLogger
                </button>
            </div>
            <div style={{ height: 600, border: '3px solid rgba(0, 0, 0, .85)' , marginTop: 5}}>


                <ReactFlow
                    onNodeMouseEnter={onNodeMouseEnter}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    fitViewOptions={fitViewOptions}
                    nodeTypes={atomNodeTypes}
                    edgeTypes={atomLinkTypes}
                >

                    <Controls>
                        <ControlButton onClick={() => console.log('action')}>
                            <AtomIcon />
                        </ControlButton>


                    </Controls>
                    <Legend
                    className={"legendContainerParents"}
                    nodeTypeList={nodeParentTypes}
                    linkTypeList={linkParentTypes}
                    />
                    <Legend
                        className={"legendContainerChildren"}
                        nodeTypeList={nodeParentTypes}
                        linkTypeList={linkParentTypes}
                    />
                </ReactFlow>
                <LinkTypeDialog
                    open={isLinkTypeDialogOpen}
                    onCancel={()=>{
                        setIsLinkTypeDialogOpen(false)
                    }}
                    onSubmit={async (value:string)=>{
                        await createLinkAndGetAtomSpace(value);
                        setIsLinkTypeDialogOpen(false)
                    }}
                    options={linkParentTypes}/>
            </div>
        </div>
    );
}

function FlowWithProvider() {
    return (
        <ReactFlowProvider>
            <App />
        </ReactFlowProvider>
    );
}

export default FlowWithProvider;



