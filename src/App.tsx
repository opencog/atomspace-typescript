import React, {useState, useEffect, useCallback, CSSProperties} from 'react';
import io from 'socket.io-client';
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
    applyNodeChanges, Connection,
    Controls,
    Edge,
    EdgeChange,
    FitViewOptions,
    Node,
    NodeChange, ReactFlowInstance, ReactFlowProvider, useReactFlow
} from "react-flow-renderer";
import { getLayoutedElements } from "./Layout";
import { nodeTypes } from "./Nodes";
import "./nodeStyles.css"
import "./edgeStyles.css"
import { edgeTypes } from './Edge';
import TypesClasses, {DefaultClass, TypesClass } from "./EdgeTypesStyle";


const socket = io("http://localhost:4000");

export const App = ()=> {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [consoleLines, setConsoleLines] = useState([""]);
    const [inputtedMessage, setInputtedMessage] = useState('');
    const [sendReadyState, setSendReadyState] = useState(false)
    enum LastCommand {
        NO_CMD = "no_cmd",
        GET_ATOMS = "get_atoms",
        GET_TYPES = "get_types",
        PUT_ATOM = "put_atom",
        ERROR = "error",
        GET_NODES = "get_nodes",
        GET_LINKS = "get_links"
    }
    const [curCmdState, setCurCmdState] = useState(LastCommand.NO_CMD)
    let curCmd = LastCommand.NO_CMD
    let nodeCount = 3;
    const bottomRef = React.useRef<HTMLDivElement>(null);

    const initialNodes: Node[] = [
    ];

    const initialEdges: Edge[] = [
    ];

    const fitViewOptions: FitViewOptions = {
        padding: 0.2
    }


    const [nodes, setNodesState] = useState<Node[]>(initialNodes);
    const [edges, setEdgesState] = useState<Edge[]>(initialEdges);

    const setNodes = (nodes: Node[]) => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setNodesState(layoutedElements.nodes);
    }

    const setEdges = (edges: Edge[]) => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setEdgesState(layoutedElements.edges);
    }
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes(applyNodeChanges(changes, nodes)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges(applyEdgeChanges(changes, edges)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges(addEdge(connection, edges)),
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

    const sendMessage = (sendMessage: string) => {
        var data = {msg: sendMessage}
        setConsoleLines(state => [ ...state,"Sent: " + data.msg])
        console.log("Sent: " + data.msg)
        setSendReadyState(false)
        socket.emit('SendEvent',data);
    }

    const getAtoms = ()=>{
        setCurCmdState(LastCommand.GET_ATOMS);
        sendMessage('AtomSpace.getAtoms("Atom")');
    }

    const getLinks = ()=>{
        setCurCmdState(LastCommand.GET_LINKS);
        sendMessage('AtomSpace.getAtoms("Link")');
    }

    const trimTrailJson = (res: string) => {
        console.log(`trim "${res.substring(res.length-6)}"?`)
        if(res.substring(res.length-6).includes("json")) {
            return res.substring(0, res.length - 6)
        }
        else {
            return res
        }
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


    useEffect(()=>{
        socket.on('connect', () => {
            console.log("Connected")
            setIsConnected(true);
            setSendReadyState(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        // Move this outsite of useEffect
    },[]);

    useEffect(() => {
        socket.removeListener('RecEvent');
        socket.on('RecEvent', function (ReceiveEvent) {
            //console.log("Received: " + ReceiveEvent.msg)
            setConsoleLines(state => [ ...state, "Rec: " + ReceiveEvent.msg])
            bottomRef.current?.scrollIntoView();
            setSendReadyState(true);
            console.log(`Current Command: ${curCmdState}`);
            switch(curCmdState){
                case LastCommand.GET_ATOMS: {
                    let trimmed = trimTrailJson(ReceiveEvent.msg)
                    console.log(trimmed);
                    let newAtoms: AtomBase[] = JSON.parse(trimmed)
                    setAtoms(newAtoms);

                    // makeAtom(newAtom[0]);
                    setCurCmdState(LastCommand.NO_CMD);
                    break
                }
                case LastCommand.GET_LINKS: {
                    let trimmed = trimTrailJson(ReceiveEvent.msg)
                    console.log(trimmed);
                    

                    // makeAtom(newAtom[0]);
                    setCurCmdState(LastCommand.NO_CMD);
                    break
                }
                case LastCommand.GET_TYPES: {

                }
            }
        });

    }, [curCmdState]);

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
                            <div className="bottomContainerElement" ref={bottomRef} />
                            {'_'}
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
                            if(inputtedMessage != "")
                                sendMessage(inputtedMessage);
                        }}
                        disabled={!sendReadyState}
                        style={{ width:"90px" }}

                    >
                        Send
                    </button>
                </div>
                <button
                    onClick={getAtoms}
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
                    onClick={getLinks}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    GetLinks
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
                    <Controls/>
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



