import express, { Express } from "express";
import { GroqApiFacade } from "./core/GroqApiFacade";
import { GroqClient } from "./client/GroqClient";
import dotenv from "dotenv";
import { ToolsDefinition } from "./core/ToolsDefinition";

dotenv.config();
const toolsDefinition = ToolsDefinition.load("./tool-definitions.yml");
if (!toolsDefinition) {
    console.log("No tools definition found");
} 
const app: Express = express();
const groqClient = new GroqClient(process.env.GROQ_API_KEY as string,
     "llama3-8b-8192", toolsDefinition);
const groqApiFacade = new GroqApiFacade(groqClient, 11434, app);
groqApiFacade.listen();