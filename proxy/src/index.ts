import { Server } from "socket.io";
import {run} from "./Telnetclient";


process.env.TARGET_PORT = "17001";
process.env.TARGET_HOST = "localhost";

const express = require( "express" );
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req:any, res:any ) => {

} );

// endpoint here/
// open socket endpoint

// set on-packet method ( or whatever receive method is more efficient )
// when you get data on-packet method, then turn around and call `run` with that data.
// then when you get a response from `run` - send that info back to socket.io

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

const io = new Server(4000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

let responseCount = 0

io.on("connection", (socket) => {
    console.log("someone connected");

    socket.on('SendEvent', async function (SendEvent) {
        let cogResponse = await run(SendEvent.msg);
        var message = {
            from: socket.id,
            msg: cogResponse
        }
        socket.emit('RecEvent', message);
        console.log(`Returned data ${responseCount}`)
        responseCount++;
    });
});