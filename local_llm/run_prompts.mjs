import { createOpencodeClient } from "@opencode-ai/sdk";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

// Helper function to expand ~ to home directory
const expandTilde = (filePath) => {
  if (filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
};

// --- Configuration ---
const PROJECT_PATH = expandTilde("~/github/demo-web-app");
const RESULTS_PATH = expandTilde("~/github/llm-experiments/local_llm/results");
const MODELS = [
  { providerID: "github-copilot", modelID: "gpt-5.3-codex", name: "GitHub Copilot (GPT-5.3)" }
];
const PROMPTS = [
  "In the \"<path>\" folder you are given a legacy project \"ICU\". You have to understand how it works. Your goal is to output an improvement plan where you will summarise issues that you have found and create a step-by-step plan to fix them."
];
const OUTPUT_FILENAMES = ["PLAN.md"];


// --- Main Script ---
async function main() {
  console.log("Starting script...");

  const client = createOpencodeClient({
    baseUrl: "http://127.0.0.1:4096",
  });
  console.log("OpenCode client created.");

  const session = await client.session.create({ body: { title: "Code Analysis Automation" } });
  if (!session) {
    console.error("Failed to create session.");
    console.error("Session response:", JSON.stringify(session, null, 2));
    return;
  }
  
  // Handle both response styles
  const sessionId = session.data?.id || session.info?.id || session.id;
  if (!sessionId) {
    console.error("Failed to extract session ID.");
    console.error("Session response:", JSON.stringify(session, null, 2));
    return;
  }
  console.log("Session created:", sessionId);


  for (const model of MODELS) {
    console.log(`\n--- Using Model: ${model.name} ---`);

    const modelResultsPath = path.join(RESULTS_PATH, model.modelID.replace(/[/.]/g, "_"));
    await fs.mkdir(modelResultsPath, { recursive: true });
    console.log(`Results will be saved in: ${modelResultsPath}`);

    for (let i = 0; i < PROMPTS.length; i++) {
      const promptText = PROMPTS[i].replace(/<path>/g, PROJECT_PATH);
      const outputFilename = OUTPUT_FILENAMES[i];
      console.log(`Running prompt ${i + 1}/${PROMPTS.length}: "${promptText.substring(0, 50)}..."`);

      try {
        const result = await client.session.prompt({
          path: { id: sessionId },
          body: {
            model: { providerID: model.providerID, modelID: model.modelID },
            parts: [{ type: "text", text: promptText }],
          },
        });

        // Extract the response text from result.data.parts array
        const textPart = result.data?.parts?.find(p => p.type === 'text');
        const assistantResponse = textPart?.text || "No response text found.";
        const outputPath = path.join(modelResultsPath, outputFilename);
        await fs.writeFile(outputPath, assistantResponse);
        console.log(`Saved result to: ${outputPath}`);

      } catch (error) {
        console.error(`Error processing prompt with model ${model.name}:`, error.message);
        const errorOutputPath = path.join(modelResultsPath, `ERROR_${outputFilename}`);
        await fs.writeFile(errorOutputPath, `Error processing prompt: ${promptText}\n\n${error.stack}`);
      }
    }
  }

  console.log("\nScript finished.");
}

main().catch(console.error);
