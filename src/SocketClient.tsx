import React, {useState, useEffect, useCallback} from 'react';
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
    NodeChange, ReactFlowProvider, useReactFlow
} from "react-flow-renderer";

const socket = io("http://localhost:4000");

export const SocketClient = ()=> {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [consoleLines, setConsoleLines] = useState([""]);
    const [inputtedMessage, setInputtedMessage] = useState('');
    const [sendReadyState, setSendReadyState] = useState(false)
    enum LastCommand {
        NO_CMD = "no_cmd",
        GET_ATOMS = "get_atoms",
        PUT_ATOM = "put_atom",
        ERROR = "error",
    }
    const [command, setCommand] = React.useState<LastCommand>(LastCommand.NO_CMD);

    let nodeCount = 3;

    const sendMessage = (sendMessage: string) => {
        var data = {msg: sendMessage}
        setConsoleLines(state => [ ...state,"Sent: " + data.msg])
        console.log("Sent: " + data.msg)
        setSendReadyState(false)
        socket.emit('SendEvent',data);
    }

    const getAtoms = ()=>{
        setCommand(LastCommand.GET_ATOMS);
        sendMessage('AtomSpace.getAtoms("Atom")');
    }

    const trimTrailJson = (res: String) => {
        console.log(res.substring(res.length-6))
        if(res.substring(res.length-6).includes("json")) {
            return res.substring(0, res.length - 6)
        }
        else {
            return res
        }
    }

    const bottomRef = React.useRef<HTMLDivElement>(null);


    const initialNodes: Node[] = [
        { id: '1', data: { label: "Node 1"}, position: { x: 5, y: 5 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
    ];

    const initialEdges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2'},
    ];

    const fitViewOptions: FitViewOptions = {
        padding: 0.2
    }


    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const reactFlowInstance = useReactFlow();
    const makeNodes = useCallback(() => {
        let newNode = { id: `${nodeCount}`, data: { label: `Node ${nodeCount}` }, position: { x: 100, y: 100 } };
        nodeCount++;
        reactFlowInstance.addNodes(newNode)
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log()
            setIsConnected(true);
            setSendReadyState(true)
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('RecEvent', function (ReceiveEvent) {
            //console.log("Received: " + ReceiveEvent.msg)
            setConsoleLines(state => [ ...state, "Rec: " + ReceiveEvent.msg])
            bottomRef.current?.scrollIntoView();
            setSendReadyState(true)
            console.log(`Command ${command}`)
            switch(command){
                case LastCommand.GET_ATOMS: {
                    console.log(trimTrailJson(ReceiveEvent.msg))
                    break
                }
            }
            setCommand(LastCommand.NO_CMD);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [command,consoleLines]);

    return (
        <div>
            <div style={{ width:"1000px" }}>
                <TableContainer style={{ height: 300, maxWidth:1000}}>
                    <Table sx={{ minWidth: 980}} size="small" aria-label="a dense table">
                        <TableHead sx = {{py:0}}>
                            <TableRow>
                                <TableCell>telnet output</TableCell>
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
                    onClick={() => {
                        sendMessage(inputtedMessage);
                    }}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}
                >
                    Button 4
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
            <SocketClient />
        </ReactFlowProvider>
    );
}

export default FlowWithProvider;