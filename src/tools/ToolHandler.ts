import Groq from "groq-sdk";

export class ToolHandler {
    
    static async handleTools(
        responesMessage:  Groq.Chat.Completions.ChatCompletionMessage,
        avaiableFunctions: Record<string, (args: any) => Promise<string>>
    ) : Promise<Groq.Chat.Completions.ChatCompletionMessageParam[] > {
        const toolCallResults : Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
        const toolCalls = responesMessage.tool_calls;
        if (!toolCalls) {
            return toolCallResults;
        }
        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name as keyof typeof avaiableFunctions;
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const functionResult = await avaiableFunctions[functionName](functionArgs);
            toolCallResults.push({
                tool_call_id: toolCall.id,
                role: "tool",
                content: functionResult
            });
        }
        return toolCallResults;
    }  
}

