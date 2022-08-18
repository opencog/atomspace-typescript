import {io, Socket} from "socket.io-client";

export interface AtomBase {
    type: string;
    name?: string;
    outgoing?: AtomBase[];
}

export class OpenCogAPI {

    private websocket:  WebSocket;
    //private scmWebsocket: WebSocket;
    static api: OpenCogAPI;
    static updateConsole: Function;

    constructor() {
        this.websocket = new WebSocket('ws://localhost:18080/json');
        //this.scmWebsocket = new WebSocket('ws://localhost:18080/scm')
    }

    static getSocket() {
        if(OpenCogAPI.api){
            return OpenCogAPI.api.websocket;
        } else {
            OpenCogAPI.api = new OpenCogAPI();
            return OpenCogAPI.api.websocket;
        }
    }

    static sendMessage = (sendMessage: string) => {
        OpenCogAPI.updateConsole("S> "+sendMessage);
        OpenCogAPI.getSocket().send(sendMessage);
    }

    static async sendRawString(rawString: string) {
            OpenCogAPI.sendMessage(rawString);
            OpenCogAPI.getSocket().addEventListener('message', function sendRawString(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                OpenCogAPI.getSocket().removeEventListener('message',sendRawString)
            });
    }

    static async getAllAtoms(): Promise<AtomBase[]> {
        const returnPromise = new Promise<AtomBase[]>((resolve,reject)=>{
            OpenCogAPI.sendMessage('AtomSpace.getAtoms("Atom")');
            OpenCogAPI.getSocket().addEventListener('message', function getAtomListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                let returnedAtoms: AtomBase[] = JSON.parse(trimmed);
                resolve(returnedAtoms);
                OpenCogAPI.getSocket().removeEventListener('message',getAtomListener)
            });


        });
        return returnPromise;
    }

    static async makeAtom(newAtom: AtomBase): Promise<boolean> {
        const returnPromise = new Promise<boolean>((resolve,reject)=>{
            OpenCogAPI.sendMessage(`AtomSpace.makeAtom(${JSON.stringify(newAtom)})`);
            OpenCogAPI.getSocket().addEventListener('message', function makeAtomListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                if(trimmed.match("true")){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message',makeAtomListener)
            });
        });
        return returnPromise;
    }

    static async loadAtoms(newAtoms: AtomBase[]): Promise<boolean> {
        const returnPromise = new Promise<boolean>((resolve,reject)=>{
            OpenCogAPI.sendMessage(`AtomSpace.loadAtoms(${JSON.stringify(newAtoms)})`);
            OpenCogAPI.getSocket().addEventListener('message', function loadAtomsListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                if(trimmed.match("true")){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message',loadAtomsListener)
            });
        });
        return returnPromise;
    }

    static async haveAtom(checkAtom: AtomBase): Promise<boolean> {
        const returnPromise = new Promise<boolean>((resolve,reject)=>{
            OpenCogAPI.sendMessage(`AtomSpace.haveAtom(${JSON.stringify(checkAtom)})`);
            OpenCogAPI.getSocket().addEventListener('message', function haveAtomListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                if(trimmed.match("true")){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message',haveAtomListener)
            });
        });
        return returnPromise;
    }

    static async haveNode(checkNode: AtomBase): Promise<boolean> {
        const returnPromise = new Promise<boolean>((resolve,reject)=>{
            OpenCogAPI.sendMessage(`AtomSpace.haveAtom(${JSON.stringify(checkNode)})`);
            OpenCogAPI.getSocket().addEventListener('message', function haveNodeListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                if(trimmed.match("true")){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message',haveNodeListener)
            });
        });
        return returnPromise;
    }

    static async haveLink(checkLink: AtomBase): Promise<boolean> {
        const returnPromise = new Promise<boolean>((resolve,reject)=>{
            let linkType = checkLink.type.replace('Link','')
            OpenCogAPI.sendMessage(`AtomSpace.haveLink("${linkType}",${JSON.stringify(checkLink.outgoing)})`);
            OpenCogAPI.getSocket().addEventListener('message', function haveLinkListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                if(trimmed.match("true")){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message',haveLinkListener)
            });
        });
        return returnPromise;
    }

    static async getIncoming(checkAtomIncoming: AtomBase): Promise<AtomBase[]> {
        const returnPromise = new Promise<AtomBase[]>((resolve,reject)=>{
            OpenCogAPI.sendMessage(`AtomSpace.getIncoming(${JSON.stringify(checkAtomIncoming)})`);
            OpenCogAPI.getSocket().addEventListener('message', function getIncomingListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                let returnedAtoms: AtomBase[] = JSON.parse(trimmed);
                resolve(returnedAtoms);
                OpenCogAPI.getSocket().removeEventListener('message',getIncomingListener)
            });
        });
        return returnPromise;
    }

    //Get Atom Values
    //AtomSpace.getValues()

    //Set Atom Values
    //AtomSpace.setValue()

    //Get Truth Value
    //AtomSpace.getTV()

    //Set Truth Value
    //AtomSpace.setTV()

    static async executeAtom(executableAtom: AtomBase): Promise<AtomBase> {
        const returnPromise = new Promise<AtomBase>((resolve,reject)=>{
            OpenCogAPI.sendMessage(`AtomSpace.execute(${JSON.stringify(executableAtom)})`);
            OpenCogAPI.getSocket().addEventListener('message', function executeAtomListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                let returnedAtom: AtomBase = JSON.parse(trimmed);
                resolve(returnedAtom);
                OpenCogAPI.getSocket().removeEventListener('message',executeAtomListener)
            });
        });
        return returnPromise;
    }

    static async getJsonVersion(): Promise<string> {
        const returnPromise = new Promise<string>((resolve,reject)=>{
            OpenCogAPI.sendMessage("AtomSpace.version()");
            OpenCogAPI.getSocket().addEventListener('message', function getJsonVersionListener(event) {
                OpenCogAPI.updateConsole("R> "+event.data);
                let trimmed = trimTrailJson(event.data);
                resolve(trimmed);
                OpenCogAPI.getSocket().removeEventListener('message',getJsonVersionListener)
            });
        });
        return returnPromise;
    }
}

const trimTrailJson = (res: string) => {
    let trailingString = res.substring(res.length-6);
    if(trailingString.includes("json")) {
        console.log(`Trimmed: ${trailingString}`)
        return res.substring(0, res.length - 6)
    }
    else {
        //console.log("No trim")
        return res
    }
}