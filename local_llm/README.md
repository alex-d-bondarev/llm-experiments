# How to

## Setup

1.  **Install Node.js**: Ensure you have Node.js (v18 or higher) installed.
2.  **Install dependencies**: Run the following command to install the necessary packages.
    ```bash
    npm install
    ```

## Run

1.  **Configuration**: Open `run_prompts.mjs` and update the following variables at the top of the file to match your setup:
    *   `PROJECT_PATH`: The path to the code you want to analyze (e.g., `~/dev/my-project`).
    *   `RESULTS_PATH`: The path where the results should be stored (e.g., `~/Documents/opencode_results`).
    *   `MODELS`: The list of models to use.
    *   `PROMPTS`: The list of prompts to run.
2.  **Run the script**: Execute the script from your terminal using Node.js:
    ```bash
    # First start OpenCode
    opencode serve --port 4096
    # Next run the script
    node run_prompts.mjs
    # or
    node local_llm/run_prompts.mjs
    ```
