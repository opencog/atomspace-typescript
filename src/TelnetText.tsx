import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";

// Include Nodejs' net module.
const Net = require('net');
// The port number and hostname of the server.
const port = 17001;
const host = 'localhost';



export default function DenseTable() {
/*    // Create a new TCP client.
    const client = new Net.Socket();
// Send a connection request to the server.
    client.connect({ port: port, host: host }, function() {
        // If there is no error, the server has accepted the request and created a new
        // socket dedicated to us.
        console.log('TCP connection established with the server.');
        shiftRows('TCP connection established with the server.');
        // The client can now send data to the server by writing to its socket.

        client.write('Hello, server.');
        shiftRows('Hello, server.');
    });

// The client can also receive data from the server by reading from its socket.
    // @ts-ignore
    client.on('data', function(chunk) {
       shiftRows(`Data received from the server: ${chunk.toString()}.`);
        // Request an end to the connection after the data has been received.
        client.end();
    });*/




    const [conrows, setConrows] = useState<string[]>(['ConsoleRow1','ConsoleRow2','ConsoleRow3','ConsoleRow4','ConsoleRow5','ConsoleRow6'])

    function shiftRows(newRow: string){
        setConrows(prevConrows => [prevConrows[1],prevConrows[2],prevConrows[3],prevConrows[4],prevConrows[5],newRow]);
    }

    useEffect(() => {
        let x = 0;
        const intervalID = setInterval(() => {
            if (++x === 5) {
                window.clearInterval(intervalID);
            }
            shiftRows(" . ")
        }, 1000);
        return () => {
            clearInterval(intervalID);
        };
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>telnet output</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {conrows.map((row, index) => (
                        <TableRow
                            key={index}

                        >
                            <TableCell sx = {{fontStyle: 'arial', py: 0, borderColor: 'white'}} component="th" scope="row" >
                                {row}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}