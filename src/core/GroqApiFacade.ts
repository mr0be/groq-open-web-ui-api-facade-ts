import { Express,Request, Response  } from "express";
import  bodyParser  from "body-parser";
import { GroqClient } from "../client/GroqClient";

export class GroqApiFacade {
    
    private readonly groqClient: GroqClient;
    private readonly port: number;
    private readonly app: Express;

    constructor(groqClient: GroqClient, port: number, app : Express) {
        this.groqClient = groqClient;
        this.port = port;
        this.app = app;
        app.use(bodyParser.json());
        this.addRoutes();
    }

    private addRoutes() {
        this.app.get('/api/tags', async (req, res) => this.tags(req, res));
        this.app.get('/api/version', async (req, res) => this.version(req, res));
        this.app.post('/api/chat', async (req, res) => this.chat(req, res));
        
    }
    
    private async tags(req: Request, res: Response){
        res.json({
            models: [
              {
                name: this.groqClient.getModel(),
                model: `${this.groqClient.getModel()}:latest`,
                digest: 'c46b1f2dbbd4afdab55e524e77bcc0d362beedffa65579e5b2b9ebbcfd959efa',
              },
            ]
          })
    }

    private async version(req: Request, res: Response){
        res.json({ version: '0.0.1' });
    }

   
    private async chat(req: Request, res: Response){
        const messages = req.body.messages;
        const responesMessage = await this.groqClient.generateText(messages);
        res.json({
            model: req.body.model,
            created_at: new Date().toISOString(),
            message: {
            role: "assistant",
            content: responesMessage,
                },
                done: true,
            })
        }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Groq API Facade is running on port ${this.port}`);
        });
    }
}
