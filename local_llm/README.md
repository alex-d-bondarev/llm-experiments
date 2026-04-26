# How to

1.  **Configure the script**: Open `run_prompts.sh` and update:
    *   `MODELS`: The list of models to use (format: `provider/model`)
    *   `PROMPTS`: The list of prompts to run

2.  **Start the OpenCode server** in one terminal:
    ```bash
    opencode serve --port 4096
    ```

3.  **Run the script** in another terminal:
    ```bash
    ./local_llm/run_prompts.sh
    ```

The script will:
- Log timestamp (with seconds) before sending each prompt
- Display elapsed time in human-readable format (e.g., `2m 30s`)
- Print the full JSON response from the model

