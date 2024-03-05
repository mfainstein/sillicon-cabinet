import {call as claudeCall} from "../../api/claude.js";
import {Agent} from "../agent.js"
export class ClaudeAgent extends Agent {
    createRoleAndContextPrompt(context) {
        return "Act as a " + this.role + " and answer as if you are " + this.role + " without any introductions except your answer - 2-3 sentences. "
            + "These are the other roles participating in the discussion, you can reference, answer, ask a question, agree or disagree with them: " + this.roles.join(",") + "."
            + "This is the discussion context: " + context;
    }

    async call(prompt) {
        let roleAndContextPrompt = this.createRoleAndContextPrompt(prompt);
        return claudeCall(roleAndContextPrompt);
    }

}