import { ChatOpenAI, AzureChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod";

class ChatInterface {
    constructor() {
        if (process.env.OPENAI_API_KEY) {
            this.client = new ChatOpenAI({
                modelName: 'gpt-4o',
            });
        } else if (process.env.AZURE_OPENAI_API_KEY) {
            this.client = new AzureChatOpenAI({
                azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
                modelName: 'gpt-4o',
            });
        } else {
            throw new Error('No API key found for OpenAI or Azure OpenAI.');
        }
    }

    async recognizeCaptcha(imageUrl) {
        try {
            const llm = this.client.withStructuredOutput(z.object({
                text: z.string().optional().describe("If the CAPTCHA is recognized, set this to the text of the CAPTCHA."),
                status: z.boolean().describe("If the CAPTCHA is not recognized, set this to false."),
            }));

            const sysMessage = new SystemMessage({
                content: 'You are a CAPTCHA decoder. Please output the result in JSON format.',
            });
            const message = new HumanMessage({
                content: [
                    {
                        type: "text",
                        text: "Please decode the CAPTCHA from the following image"
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: imageUrl,
                        }
                    }
                ]
            })

            const jsonResponse = await llm.invoke([sysMessage, message]);

            // console.log(jsonResponse);

            if (jsonResponse.text) {
                return jsonResponse.text;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error recognizing CAPTCHA:', error);
            throw error;
        }
    }
}

export{ ChatInterface };


