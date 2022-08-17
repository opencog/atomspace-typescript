import {io, Socket} from "socket.io-client";

export interface AtomBase {
    type: string;
    name?: string;
    outgoing?: AtomBase[];
}

export interface OCAPIResponse {
    atoms: AtomBase[];
    message: string;
}

export class OpenCogAPI {

    private websocket:  WebSocket;
    static api: OpenCogAPI;

    constructor() {
        this.websocket = new WebSocket('ws://localhost:18080/json');
    }

    static getSocket() {
        if(OpenCogAPI.api){
            return OpenCogAPI.api.websocket;
        } else {
            OpenCogAPI.api = new OpenCogAPI();
            OpenCogAPI.api.websocket.onopen = () => {
                console.log("SecondConnection")
            }
            return OpenCogAPI.api.websocket;
        }
    }

    static async getAtom(): Promise<string> {
        const returnPromise = new Promise<string>((resolve,reject)=>{
            OpenCogAPI.sendMessage('AtomSpace.getAtoms("Atom")');
            OpenCogAPI.getSocket().addEventListener('message', function getAtomListener(event) {
                let trimmed = trimTrailJson(event.data)
                //let newAtoms: AtomBase[] = JSON.parse(trimmed);

                resolve(trimmed);
                OpenCogAPI.getSocket().removeEventListener('message',getAtomListener)
            });


        });
        return returnPromise;
    }

    static sendMessage = (sendMessage: string) => {
        OpenCogAPI.getSocket().send(sendMessage);
    }
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