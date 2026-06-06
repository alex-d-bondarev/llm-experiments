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

## MacBook 2015 with 16GB RAM

```
----------Apple Mac---------
Total memory size : 16.00 GB
cpu_info: unknown
gpu_info: no_gpu
os_version: macOS 12.7.6 (21H1320)
ollama_version: 0.30.6
----------
running custom benchmark from models_file_path: ./custombenchmarkmodels.yml
Disabling sendinfo for custom benchmark
LLM models file path：./custombenchmarkmodels.yml
Checking and pulling the following LLM models
deepseek-r1:1.5b
gemma:2b
phi:2.7b
----------
Running custom-model
model_name =    deepseek-r1:1.5b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            15.49 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            16.21 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            15.32 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            14.61 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            8.89 tokens/s
--------------------
Average of eval rate:  14.104  tokens/s
----------------------------------------
model_name =    gemma:2b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            10.08 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            10.17 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            10.07 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            9.99 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            9.90 tokens/s
--------------------
Average of eval rate:  10.042  tokens/s
----------------------------------------
model_name =    phi:2.7b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            7.84 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            8.35 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            22.79 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            10.62 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            8.37 tokens/s
--------------------
Average of eval rate:  11.594  tokens/s
----------------------------------------%
```

## Raspberry Pi 4 with 4GB RAM

```
-------Linux----------

No NVIDIA GPU detected.
rocminfo failed: [Errno 2] No such file or directory: 'rocminfo'
Total memory size : 3.71 GB
cpu_info: Cortex-A72
gpu_info: no_gpu
os_version: Debian GNU/Linux 13 (trixie)
ollama_version: 0.24.0
----------
running custom benchmark from models_file_path: ./custombenchmarkmodels.yml
Disabling sendinfo for custom benchmark
LLM models file path：./custombenchmarkmodels.yml
Checking and pulling the following LLM models
deepseek-r1:1.5b
gemma:2b
phi:2.7b
----------
Running custom-model
model_name =    deepseek-r1:1.5b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            3.41 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            3.53 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            3.42 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            3.39 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            2.92 tokens/s
--------------------
Average of eval rate:  3.334  tokens/s
----------------------------------------
model_name =    gemma:2b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            2.05 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            2.08 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            2.05 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            2.05 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            2.02 tokens/s
--------------------
Average of eval rate:  2.05  tokens/s
----------------------------------------
model_name =    phi:2.7b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            2.33 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            2.31 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            2.27 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            1.97 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            2.12 tokens/s
--------------------
Average of eval rate:  2.2  tokens/s
----------------------------------------
```

## M1 with 16GB RAM

```
----------Apple Mac---------
Total memory size : 16.00 GB
cpu_info: Apple M1
gpu_info: Apple M1
os_version: macOS 26.5.1 (25F80)
ollama_version: 0.30.6
----------
running custom benchmark from models_file_path: ./custombenchmarkmodels.yml
Disabling sendinfo for custom benchmark
LLM models file path：./custombenchmarkmodels.yml
Checking and pulling the following LLM models
deepseek-r1:1.5b
gemma:2b
phi:2.7b
----------
Running custom-model
model_name =    deepseek-r1:1.5b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            41.89 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            42.12 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            41.46 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            42.30 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            39.76 tokens/s
--------------------
Average of eval rate:  41.506  tokens/s
----------------------------------------
model_name =    gemma:2b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            30.24 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            32.05 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            32.01 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            32.30 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            32.38 tokens/s
--------------------
Average of eval rate:  31.796  tokens/s
----------------------------------------
model_name =    phi:2.7b
prompt = Summarize the key differences between classical and operant conditioning in psychology.
eval rate:            31.56 tokens/s
prompt = Translate the following English paragraph into Chinese and elaborate more -> Artificial intelligence is transforming various industries by enhancing efficiency and enabling new capabilities.
eval rate:            31.48 tokens/s
prompt = What are the main causes of the American Civil War?
eval rate:            31.39 tokens/s
prompt = How does photosynthesis contribute to the carbon cycle?
eval rate:            30.05 tokens/s
prompt = Develop a python function that solves the following problem, sudoku game.
eval rate:            29.14 tokens/s
--------------------
Average of eval rate:  30.724  tokens/s
----------------------------------------
```
