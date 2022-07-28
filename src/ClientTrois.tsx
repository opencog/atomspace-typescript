import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {TableFooter} from "@mui/material";

const socket = io("http://localhost:4000");

export const ClientTrois = ()=> {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const [consoleLines, setConsoleLines] = useState([""]);
    const [inputtedMessage, setInputtedMessage] = useState('');
    const [sendReadyState, setSendReadyState] = useState(false)

    var recCount = 0;
    var sendCount = 0;

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
            console.log("Received: " + ReceiveEvent.msg)
            setConsoleLines(state => [ ...state, "Rec: " + ReceiveEvent.msg])
            recCount++
            bottomRef.current?.scrollIntoView();
            setSendReadyState(true)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const sendMessage = (sendMessage: string) => {
        var data = {msg: sendMessage}
        socket.emit('SendEvent',data);
        setConsoleLines(state => [ ...state,"Sent: " + data.msg])
        console.log("Sent: " + data.msg)
        setSendReadyState(false)
    }

    const bottomRef = React.useRef<HTMLDivElement>(null);

    return (
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
                        sendMessage(inputtedMessage);
                    }}
                    disabled={!sendReadyState}
                    style={{ width:"90px" }}

                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ClientTrois;