
export default class Environment {
    static TARGET_HOST (): string {
        return Environment.safeRetrieval("TARGET_HOST");
    }
    static TARGET_PORT (): number {
        return Number.parseInt(Environment.safeRetrieval("TARGET_PORT"));
    }
    private static safeRetrieval(variableName: string){
        const variable = process.env[variableName]
        if(variable) {
            return variable
        } else {
            throw new Error("Variable not found in environment");
        }
    }
}