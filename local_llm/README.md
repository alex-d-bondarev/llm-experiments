# How to

1.  Configure the script: Open `run_prompts.sh` and update:
    *   `MODELS`: The list of models to use (format: `provider/model`)
    *   `PROMPTS`: The list of prompts to run
2. Copy `run_prompts.sh` to a project that needs to be analyzed.
3. Start 2 shell sessions in a project that needs to be analyzed:
   1. Start the OpenCode server in first session:
       ```bash
       opencode serve --port 4096
       ```
   2. Run the script in the second session:
       ```bash
       ./run_prompts.sh
       ```

The script will:
- Log timestamp (with seconds) before sending each prompt
- Display elapsed time in human-readable format (e.g., `2m 30s`)
- Print the full JSON response from the model

