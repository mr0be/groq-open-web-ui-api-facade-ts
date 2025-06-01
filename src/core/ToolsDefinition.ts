import * as fs from 'fs';
import { Groq } from "groq-sdk";
import * as yaml from 'js-yaml';


export class ToolsDefinition {
    static load(filePath: string): Groq.Chat.Completions.ChatCompletionTool[] | undefined  {
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const data = yaml.load(fileContents) as Groq.Chat.Completions.ChatCompletionTool[];
            return data;
        }
        return undefined;
    }
}
