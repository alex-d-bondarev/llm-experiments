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
const PROJECT_PATH = expandTilde("~/work/github/llm-experiments/local_llm");
const RESULTS_PATH = expandTilde("~/work/github/llm-experiments/results");
const MODELS = ["GPT-4o", "GPT-4.1"];
const PROMPTS = [
  "Analyse the project in the given folder and write down your thoughts in a new \"ANALYSE.md\" file.",
  "Explain to me how the code in \"<path>\" folder works"
];
const OUTPUT_FILENAMES = ["ANALYSE.md", "EXPLANATION.md"];


// --- Main Script ---
async function main() {
  console.log("Starting script...");

  const { client } = await createOpencodeClient();
  const session = await client.session.create({ body: { title: "Code Analysis Automation" } });


  for (const model of MODELS) {
    console.log(`\n--- Using Model: ${model} ---`);

    const modelResultsPath = path.join(RESULTS_PATH, model.replace(/[/.]/g, "_"));
    await fs.mkdir(modelResultsPath, { recursive: true });
    console.log(`Results will be saved in: ${modelResultsPath}`);

    for (let i = 0; i < PROMPTS.length; i++) {
      const promptText = PROMPTS[i].replace(/<path>/g, PROJECT_PATH);
      const outputFilename = OUTPUT_FILENAMES[i];
      console.log(`Running prompt ${i + 1}/${PROMPTS.length}: "${promptText.substring(0, 50)}..."`);

      try {
        const result = await client.session.prompt({
          path: { id: session.data.id },
          body: {
            // The model parameter in the SDK might expect an object with providerID and modelID.
            // This is a placeholder and might need adjustment based on your opencode.json config.
            // For now, we assume a simple string might work if the models are globally unique
            // and have a default provider.
            model: model,
            parts: [{ type: "text", text: promptText }],
          },
        });

        const assistantResponse = result.data.parts.find(p => p.type === 'text')?.text || "No response text found.";
        const outputPath = path.join(modelResultsPath, outputFilename);
        await fs.writeFile(outputPath, assistantResponse);
        console.log(`Saved result to: ${outputPath}`);

      } catch (error) {
        console.error(`Error processing prompt with model ${model}:`, error);
        const errorOutputPath = path.join(modelResultsPath, `ERROR_${outputFilename}`);
        await fs.writeFile(errorOutputPath, `Error processing prompt: ${promptText}\n\n${error.stack}`);
      }
    }
  }

  console.log("\nScript finished.");
}

main().catch(console.error);
