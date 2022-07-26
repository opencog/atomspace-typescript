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



export default function ConsoleText() {
    //Scrolls the text up for giving feedback in the browser
    //In hindsight this should just be printed to the console, but it was good for getting me back into the react mindset

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
            shiftRows(" . ") //Returning an empty row makes it not be rendered. Use a period instead
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