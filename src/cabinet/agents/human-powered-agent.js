import { call as chatGptCall } from "../../api/chat-gpt.js";
import { Agent } from "../agent.js"
import inquirer from 'inquirer';
import readline from 'readline';

export class HumanPoweredAgent extends Agent {

    

    async call() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let answer = "";
        try {
            function question(query) {
                return new Promise((resolve) => {
                    rl.question(query, (answer) => {
                        resolve(answer);
                    });
                });
            }
            answer = await question(this.role + ': ');

        } catch (error) {
            console.error(`An error occurred: ${error}`);
        } finally {
            rl.close(); // Don't forget to close the readline interface
        }

        return answer;

    }

}