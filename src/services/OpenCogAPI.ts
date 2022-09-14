export interface AtomBase {
    type: string;
    name?: string;
    outgoing?: AtomBase[];
}

interface ValueNode {
    name?: string;
    type: string;
    value: ValueNode | Array<any> | string | number;
}

interface AtomKeyValuePair {
    key: AtomBase;
    value: ValueNode;
}
export enum APICommands {
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

export class OpenCogAPI {
    private websocket:  WebSocket;
    //private scmWebsocket: WebSocket;
    static api: OpenCogAPI;

    constructor() {
        this.websocket = new WebSocket('ws://192.168.10.2:18080/json');
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

    private static sendMessage = (sendMessage: string) => {
        OpenCogAPI.getSocket().send(sendMessage);
    }

    static async sendRawString(
        consoleCallback: (newLine: string) => void,
        rawString: string
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            consoleCallback("S> " + rawString);
            OpenCogAPI.getSocket().addEventListener('message', function sendRawStringListener(event) {
                consoleCallback("R> " + event.data);
                resolve(event.data)
                OpenCogAPI.getSocket().removeEventListener('message', sendRawStringListener)
            });
            OpenCogAPI.sendMessage(rawString);
        });
    }

    static async getAllAtoms(
        consoleCallback: (newLine: string)=>void
    ): Promise<AtomBase[]> {
        return new Promise<AtomBase[]>((resolve, reject) => {
            let requestString = 'AtomSpace.getAtoms("Atom",true)'
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getAtomListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                let returnedAtoms: AtomBase[] = JSON.parse(trimmedResponse);
                resolve(returnedAtoms);
                OpenCogAPI.getSocket().removeEventListener('message', getAtomListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async makeAtom(
        consoleCallback: (newLine: string)=>void,
        newAtom: AtomBase
    ): Promise<AtomBase> {
        return new Promise<AtomBase>((resolve, reject) => {
            let requestString = `AtomSpace.makeAtom(${JSON.stringify(newAtom)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function makeAtomListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(newAtom);
                } else {
                    reject("AtomSpace rejected the atom insertion.");
                }
                OpenCogAPI.getSocket().removeEventListener('message', makeAtomListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async addLink(
        consoleCallback: (newLine: string)=>void,
        linkType: string,
        linkedAtoms: AtomBase[]
    ): Promise<AtomBase> {
        return new Promise<AtomBase>((resolve, reject) => {
            let newLink: AtomBase = {type: linkType, outgoing: linkedAtoms}
            let requestString = `AtomSpace.makeAtom(${JSON.stringify(newLink)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function addLinkListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(newLink);
                } else {
                    reject("AtomSpace rejected the link insertion.");
                }
                OpenCogAPI.getSocket().removeEventListener('message', addLinkListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async loadAtoms(
        consoleCallback: (newLine: string)=>void,
        newAtoms: AtomBase[]
    ): Promise<AtomBase[]> {
        return new Promise<AtomBase[]>((resolve, reject) => {
            let requestString = `AtomSpace.loadAtoms(${JSON.stringify(newAtoms)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function loadAtomsListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(newAtoms);
                } else {
                    reject("AtomSpace rejected the bulk insertion.");
                }
                OpenCogAPI.getSocket().removeEventListener('message', loadAtomsListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async haveAtom(
        consoleCallback: (newLine: string)=>void,
        atomToCheck: AtomBase
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let requestString = `AtomSpace.haveAtom(${JSON.stringify(atomToCheck)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function haveAtomListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message', haveAtomListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async haveNode(
        consoleCallback: (newLine: string)=>void,
        nodeToCheck: AtomBase
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let requestString = `AtomSpace.haveAtom(${JSON.stringify(nodeToCheck)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function haveNodeListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                OpenCogAPI.getSocket().removeEventListener('message', haveNodeListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    //NOTE: Have link is not the same request syntax as HaveAtom or HaveNode
    //A) The haveNode function takes an Atom object, the haveLink takes a string for the link type and array of Atoms
    //B) The Link type needs to have the keyword 'Link' removed for the match to occur properly
    static async haveLink(
        consoleCallback: (newLine: string)=>void,
        linkToCheck: AtomBase
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try{
                let linkType = linkToCheck.type.replace('Link', '')
                if(linkToCheck.type == linkType){
                    throw new Error("Unable to replace the word Link in text")
                }
                let requestString = `AtomSpace.haveLink("${linkType}",${JSON.stringify(linkToCheck.outgoing)})`
                consoleCallback("S> " + requestString);
                OpenCogAPI.getSocket().addEventListener('message', function haveLinkListener(event) {
                    consoleCallback("R> " + event.data);
                    let trimmedResponse = trimTrailJson(event.data);
                    if (trimmedResponse.match("true")) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                    OpenCogAPI.getSocket().removeEventListener('message', haveLinkListener)
                });
                OpenCogAPI.sendMessage(requestString);
            }
            catch{
                reject("Unable to replace the word Link in text")
            }
        });
    }

    static async getIncoming(
        consoleCallback: (newLine:string)=>void,
        atomToQuery: AtomBase
    ): Promise<AtomBase[]> {
        return new Promise<AtomBase[]>((resolve, reject) => {
            let requestString = `AtomSpace.getIncoming(${JSON.stringify(atomToQuery)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getIncomingListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                let returnedAtoms: AtomBase[] = JSON.parse(trimmedResponse);
                resolve(returnedAtoms);
                OpenCogAPI.getSocket().removeEventListener('message', getIncomingListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async getValues(
        consoleCallback: (newLine:string)=>void,
        atomToQuery: AtomBase
    ): Promise<AtomKeyValuePair[]> {
        return new Promise<AtomKeyValuePair[]>((resolve, reject) => {
            let requestString = `AtomSpace.getValues(${JSON.stringify(atomToQuery)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getValuesListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                let returnedKeyValuePairs: AtomKeyValuePair[] = JSON.parse(trimmedResponse);
                resolve(returnedKeyValuePairs);
                OpenCogAPI.getSocket().removeEventListener('message', getValuesListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }
    
    static async setValue(
        consoleCallback: (newLine:string)=>void,
        atomToEdit: AtomBase,
        atomKey: AtomBase,
        atomValue: ValueNode
    ): Promise<AtomKeyValuePair> {
        return new Promise<AtomKeyValuePair>((resolve, reject) => {
            let requestObject = {type:atomToEdit.type,name:atomToEdit.name,key:atomKey,value:atomValue};
            let requestString = `AtomSpace.setValues(${JSON.stringify(requestObject)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function setValueListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(requestObject);
                } else {
                    reject("sever rejected new key value parameters");
                }
                OpenCogAPI.getSocket().removeEventListener('message', setValueListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async getTruthValue(
        consoleCallback: (newLine:string)=>void,
        atomToQuery: AtomBase
    ): Promise<ValueNode[]> {
        return new Promise<ValueNode[]>((resolve, reject) => {
            let requestString = `AtomSpace.getTV(${JSON.stringify(atomToQuery)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getTruthValueListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                let returnedValue: ValueNode[] = JSON.parse(trimmedResponse);
                resolve(returnedValue);
                OpenCogAPI.getSocket().removeEventListener('message', getTruthValueListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async setTruthValue(
        consoleCallback: (newLine:string)=>void,
        atomToEdit: AtomBase,
        newTruthValue: ValueNode,
    ): Promise<ValueNode> {
        return new Promise<ValueNode>((resolve, reject) => {
            let requestString = `AtomSpace.setTV(${JSON.stringify({type:atomToEdit.type ,name:atomToEdit.name, value:newTruthValue})})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function setTruthValueListener(event) {
                let trimmedResponse = trimTrailJson(event.data);
                if (trimmedResponse.match("true")) {
                    resolve(newTruthValue);
                } else {
                    reject("Server rejected new truth value");
                }
                OpenCogAPI.getSocket().removeEventListener('message', setTruthValueListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async executeAtom(
        consoleCallback: (newLine:string)=>void,
        executableAtom: AtomBase
    ): Promise<AtomBase> {
        return new Promise<AtomBase>((resolve, reject) => {
            let requestString = `AtomSpace.execute(${JSON.stringify(executableAtom)})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function executeAtomListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                let returnedAtom: AtomBase = JSON.parse(trimmedResponse);
                resolve(returnedAtom);
                OpenCogAPI.getSocket().removeEventListener('message', executeAtomListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async getSubTypes(
        consoleCallback: (newLine:string)=>void,
        baseType: string,
        recursive: boolean,
    ): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let requestString = `AtomSpace.getSubTypes("${baseType}",${recursive})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getSubTypesListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                try {
                    let superTypes: string[] = JSON.parse(trimmedResponse);
                    resolve(superTypes);
                }
                catch(error){
                    reject("Exception during parse: "+error)
                }
                finally {
                    OpenCogAPI.getSocket().removeEventListener('message', getSubTypesListener)
                }
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async getSupertypes(
        consoleCallback: (newLine:string)=>void,
        baseType: string,
        recursive: boolean
    ): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let requestString = `AtomSpace.getSuperTypes("${baseType}",${recursive})`
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getSupertypesListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                try {
                    let superTypes: string[] = JSON.parse(trimmedResponse);
                    resolve(superTypes);
                }
                catch(error){
                    reject("Exception during parse: "+error)
                }
                finally {
                    OpenCogAPI.getSocket().removeEventListener('message', getSupertypesListener)
                }
            });
            OpenCogAPI.sendMessage(requestString);
        });
    }

    static async getJsonVersion(
        consoleCallback: (newLine:string)=>void
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let requestString = "AtomSpace.version()"
            consoleCallback("S> " + requestString);
            OpenCogAPI.getSocket().addEventListener('message', function getJsonVersionListener(event) {
                consoleCallback("R> " + event.data);
                let trimmedResponse = trimTrailJson(event.data);
                resolve(trimmedResponse);
                OpenCogAPI.getSocket().removeEventListener('message', getJsonVersionListener)
            });
            OpenCogAPI.sendMessage(requestString);
        });
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