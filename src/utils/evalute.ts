
export  async function evaluateExpression(expression: string): Promise<string> {
    try {
        const result = new Function(`return ${expression}`)();
        return JSON.stringify({ result });
    } catch (error) {
        return JSON.stringify({ error: "Invalid expression" });
    }
}