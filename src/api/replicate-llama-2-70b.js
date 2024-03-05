import Replicate from "replicate";
import ora from 'ora';
import { load } from "./credentials.js";

const replicate = new Replicate({
    auth: load("replicate", "key"),
});

export function isValid() {
    let key = load("replicate", "key");
    return key?.length > 0
}

export async function call(prompt, systemPrompt) {
    const spinner = ora({ spinner: 'pipe' }).start();
    try {
        const output = await replicate.run(
            "replicate/llama-2-70b-chat:ac808388e2e9d8ed35a5bf2eaa7d83f0ad53f9e3df31a42e4eb0a0c3249b3165",
            {
                input: {
                    prompt: prompt,
                    system_prompt: systemPrompt,
                    max_new_tokens: 10000,
                    max_new_tokens: 500,
                    debug: false,
                    top_k: 50,
                    top_p: 1,
                }
            }
        );
        spinner.stop();
        spinner.clear();
        return output.join("");
    } catch (error) {
        spinner.stop();
        spinner.clear();
        return "Error: " + error.message;
    }

}