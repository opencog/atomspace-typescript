import React, {useCallback, useEffect, useState} from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {TableFooter} from "@mui/material";
import ReactFlow, {
    addEdge,
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
import {getLayoutedElements} from "./Layout";
import {nodeTypes} from "./Nodes";
import "./nodeStyles.css"
import "./edgeStyles.css"
import {edgeTypes} from './Edge';
import TypesClasses, {TypesClass} from "./EdgeTypesStyle";
import {ReactComponent as AtomIcon} from './icons/atom-bold.svg';
import {OpenCogAPI} from "./OpenCogAPI";


export const App = ()=> {
    const [isConnected, setIsConnected] = useState(false);
    const [sendReadyState, setSendReadyState] = useState(false);
    const [consoleLines, setConsoleLines] = useState([""]);
    const [inputtedMessage, setInputtedMessage] = useState('');

    enum ApiCommand {
        None = "NONE",
        GetAllAtoms = "GET_ALL_ATOMS",
        MakeAtom = "MAKE_ATOM",
        LoadAtoms = "LOAD_ATOMS",
        HaveAtom = "HAVE_ATOM",
        HaveNode = "HAVE_NODE",
        HaveLink = "HAVE_LINK",
        SendRawString = "SEND_RAW_STRING",
        GetJsonVersion = "GET_JSON_VERSION",
        GetIncoming = "GET_INCOMING",
        ExecuteAtom = "EXECUTE_ATOM",
        GetNodes = "GET_NODES",
        GetLinks = "GET_LINKS",
        GetTypes = "GET_TYPES",
    }
    const [command, setCommand] = useState(ApiCommand.None);
    let nodeCount = 3;
    const bottomRef = React.useRef<HTMLDivElement>(null);

    const initialNodes: Node[] = [
    ];

    const initialEdges: Edge[] = [
    ];

    const fitViewOptions: FitViewOptions = {
        padding: 0.2
    }
    const [makeAtomsState, setMakeAtomsState] = useState<AtomBase[]>([])

    const [nodes, setNodesState] = useState<Node[]>(initialNodes);
    const [edges, setEdgesState] = useState<Edge[]>(initialEdges);

    const addConsoleLine = (newLine: string) => {
        setConsoleLines(state => [ ...state,newLine])
    }

    OpenCogAPI.getSocket().onopen = () => {
        console.log("WS Connected")
        setIsConnected(true)
        setSendReadyState(true);
    }


    const setNodes = (nodes: Node[]) => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setNodesState(layoutedElements.nodes);
    };
    const setEdges = (edges: Edge[]) => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setEdgesState(layoutedElements.edges);
    };
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

            let newLink: AtomBase = {
                name: "Something",
                type: "ListLink",
                outgoing: [

                ]

            }
            setEdges(addEdge(connection, edges))
        },
        [setEdges]
    );

    const reactFlowInstance = useReactFlow();
    const makeNodes = useCallback(() => {
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
            let newNode = { id: `${atom.name}`, type: "rectangle", data: { label: `Name: ${atom.name}`, info: `Type: ${atom.type}`, atomType: atom.type }, position: { x: 100, y: 100 }};
            newNodes.push(newNode);
        });
        (linkAtoms as AtomLink[]).forEach((link:AtomLink, index:number, array:AtomBase[])=>{
            let linkId = `${link.type}:${link.outgoing[0].name},${link.outgoing[1].name}`
            let newNode = { id: linkId, type: "circle" ,data: { label: `${link.type}, Links: ${link.outgoing.length}`, atomType: link.type }, position: { x: 100, y: 100 }};
            link.outgoing.forEach((linkNode, index:number )=> {

                let typeClass: TypesClass | undefined = TypesClasses.get(link.type);
                console.log(link.type.toString())

                    let newEdge = { id: `${index}${linkId}`, type: "colored", source: linkId, target: `${linkNode.name}`, data: {atomType: link.type}};
                    newEdges.push(newEdge);

                })
            newNodes.push(newNode);
        });
        reactFlowInstance.setNodes(newNodes);
        reactFlowInstance.setEdges(newEdges);
    }, []);

    const makeAtomRequestTrue = () => {

        console.log("Passed atoms: "+ makeAtomsState.length+ " Contains:"+ JSON.stringify(makeAtomsState))
        let newNodes: Node[] = [];
        makeAtomsState.forEach((atom:AtomBase)=>{
            let newNode = { id: `${atom.name}`, type: "rectangle", data: { label: `Name: ${atom.name}`, info: `Type: ${atom.type}`, atomType: atom.type }, position: { x: 100, y: 100 }};
            newNodes.push(newNode);
        });
        reactFlowInstance.addNodes(newNodes);
        setMakeAtomsState([]);
    }

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
            case ApiCommand.SendRawString:
                console.log("Command: "+command)
                OpenCogAPI.sendRawString(addConsoleLine,inputtedMessage);
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.GetJsonVersion:
                console.log("Command: "+command)
                getJsonVersion();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.GetAllAtoms:
                console.log("Command: "+command)
                getAllAtoms()
                setCommand(ApiCommand.None)
                break;
            case ApiCommand.MakeAtom:
                console.log("Command: "+command);
                makeAtom();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.LoadAtoms:
                console.log("Command: "+command);
                loadAtoms();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.HaveAtom:
                console.log("Command: "+command);
                haveAtom();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.HaveNode:
                console.log("Command: "+command);
                haveNode();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.HaveLink:
                console.log("Command: "+command);
                haveLink();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.GetIncoming:
                console.log("Command: "+command);
                getIncoming();
                setCommand(ApiCommand.None);
                break;
            case ApiCommand.ExecuteAtom:
                console.log("Command: "+command);
                executeAtom();
                setCommand(ApiCommand.None);
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

                                setCommand(ApiCommand.SendRawString)
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
                    onClick={event => setCommand(ApiCommand.GetAllAtoms)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Get Atoms
                </button>
                <button
                    onClick={makeNodes}
                    style={{ width:"90px" }}
                >
                    MakeNodes
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.LoadAtoms)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Make Atoms
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.MakeAtom)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Make Atom
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.HaveAtom)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Have Atom
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.HaveNode)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Have Node
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.HaveLink)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Have Link
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.GetJsonVersion)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Get Version
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.GetIncoming)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Get Incoming
                </button>
                <button
                    onClick={event => setCommand(ApiCommand.ExecuteAtom)}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Execute Atom
                </button>
            </div>
            <div style={{ height: 600, border: '3px solid rgba(0, 0, 0, .85)' , marginTop: 5}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    fitViewOptions={fitViewOptions}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                >
                    <Controls>
                        <ControlButton onClick={() => console.log('action')}>
                            <AtomIcon />
                        </ControlButton>


                    </Controls>
                </ReactFlow>
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



