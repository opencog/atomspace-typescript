import {Telnet} from "telnet-client";
import Environment from "./Environment";

process.on('unhandledRejection', error => {
    throw error
});



export async function run(cmd:any) {
    let connection:Telnet = new Telnet()

    // these parameters are just examples and most probably won't work for your use-case.
    let params = {
        host: Environment.TARGET_HOST(),
        port: Environment.TARGET_PORT(),
        negotiationMandatory: false,
        timeout: 5000
    }

    try {
        await connection.connect(params)
    } catch (error) {
        // handle the throw (timeout)
    }

    await connection.send(`json`, {
        waitfor: "\n",
    });

    let res = await connection.send(`${cmd}`, {
        waitfor: "\n",
    });

    await connection.end();

    return res
}