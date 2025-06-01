import { Groq } from "groq-sdk";

export class CalculateTool {
    static getDefinition(): Groq.Chat.Completions.ChatCompletionTool {
        return {
            type: "function" as const,
            function: {
                name: "calculate",
                description: "Evaluate a mathematical expression",
                parameters: {
                    type: "object",
                    properties: {
                        expression: {
                            type: "string",
                            description: "The mathematical expression to evaluate",
                        },
                    },
                    required: ["expression"],
                },
            },
        };
    }
}