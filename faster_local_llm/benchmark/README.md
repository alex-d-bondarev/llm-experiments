# How to run

1. Make sure [ollama](https://ollama.com/download/mac) is installed
   ```shell
   curl -fsSL https://ollama.com/install.sh | sh
   ```
2. Make sure [uv](https://docs.astral.sh/uv/getting-started/installation/) is installed, like:
   ```shell
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
2. Install dependencies
   ```shell
   uv sync
   ```
3. Run the test
   ```shell
   uv run llm_benchmark run
   ```

# Results

# M1 with 16GB RAM

