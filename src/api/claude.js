import ora from 'ora';
import { load } from "./credentials.js";
import Anthropic from '@anthropic-ai/sdk';

// Set the API endpoint and your API key 
const apiKey = load("claude", "key");

const anthropic = new Anthropic({
    apiKey: apiKey, // This is the default and can be omitted
});

export async function call(prompt) {
    const spinner = ora({ spinner: 'pipe' }).start();
    try {
        const message = await anthropic.messages.create({
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }],
            model: 'claude-3-opus-20240229',
        });

        const data = message.content[0];
        spinner.stop();
        spinner.clear();
        return data?.text;
    } catch (error) {
        spinner.stop();
        spinner.clear();
        return "Error: " + error.message;
    }
}