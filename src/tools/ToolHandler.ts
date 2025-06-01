import Groq from "groq-sdk";

export class ToolHandler {
    
    static async handleTools(
        responesMessage:  Groq.Chat.Completions.ChatCompletionMessage,
        avaiableFunctions: Record<string, (args: any) => Promise<string>>
    ) : Promise<Groq.Chat.Completions.ChatCompletionMessageParam | undefined> {
        const toolCall = responesMessage.tool_calls;
        if (!toolCall) {
            return;
        }
        const functionName = toolCall[0].function.name as keyof typeof avaiableFunctions;
        const functionArgs = JSON.parse(toolCall[0].function.arguments);
        const functionResult = await avaiableFunctions[functionName](functionArgs.expression);

        return {
            tool_call_id: toolCall[0].id,
            role: "tool",
            content: functionResult
        }
    }  
}

