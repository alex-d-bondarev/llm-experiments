# How to run

1. Clone this repo
   ```shell
   git clone https://github.com/alex-d-bondarev/llm-experiments.git
   ```
1. Navigate to the `benchmark folder`
   ```shell
   cd ./faster_local_llm/benchmark
   ```
1. Make sure [ollama](https://ollama.com/download/mac) is installed
   ```shell
   curl -fsSL https://ollama.com/install.sh | sh
   ```
1. Make sure [uv](https://docs.astral.sh/uv/getting-started/installation/) is installed, like:
   ```shell
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
1. Install dependencies
   ```shell
   uv sync
   ```
1. Start ollama
   ```shell
   ollama serve
   ```
1. Run the test
   ```shell
   uv run llm_benchmark run --custombenchmark=./custombenchmarkmodels.yml
   ```

# Results

# M1 with 16GB RAM

