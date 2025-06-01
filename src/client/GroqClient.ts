import { Groq } from "groq-sdk";
import { CalculateTool } from "../tools/CalculateTool";
import { ToolHandler } from "../tools/ToolHandler";
import { evaluateExpression } from "../utils/evalute";

export class GroqClient {

    private apiKey : string;
    private model : string;
    private tools :  Groq.Chat.Completions.ChatCompletionTool | null;
        

    constructor(apiKey : string, model : string,tools : Groq.Chat.Completions.ChatCompletionTool | undefined ) {
        this.apiKey = apiKey;
        this.model = model;
        this.tools = tools || null;
    }

    getModel(): string {
        return this.model;
    }

    async generateText(messages: Groq.Chat.Completions.ChatCompletionMessageParam[]) : Promise<string | null>{
            const groqclient = (new Groq({
                apiKey: this.apiKey,
            }));
            const response = await groqclient.chat.completions.create({
                model: this.model,
                max_completion_tokens: 4096,
                temperature: 0.1,
                messages: messages,
                tools: this.tools ? [this.tools] : [],
                tool_choice: "auto"
            }); 
        
            const responesMessage = response.choices[0].message;
            const toolCall = await ToolHandler.handleTools(responesMessage, {
                "calculate" : evaluateExpression
            });
        
            if (toolCall) {
                 messages.push(responesMessage);
                 messages.push(toolCall);
        
                const secondResponse = await groqclient.chat.completions.create({
                    model: this.model,
                    messages: messages
                })
                return secondResponse.choices[0].message.content; 
                       
            }
            return responesMessage.content;
    }

}