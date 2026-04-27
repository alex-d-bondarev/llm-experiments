#!/bin/bash

# Configuration
OPENCODE_URL="http://127.0.0.1:4096"

MODELS=(
  "github-copilot/gpt-4.1"
)

PROMPTS=(
  "In the current folder you are given a legacy project \"ICU\". You have to understand how it works. Your goal is to output an improvement plan where you will summarise issues that you have found and create a step-by-step plan to fix them.",
  "I have some basic knowledge about HTML, CSS and JavaScript. But I do not know how NodeJS works. In the current folder you are given a legacy project \"ICU\". Please explain to me how 'frontend' is implemented in this project.",
  "You are an experienced software architect that cares about software best practicies, such as, but not limited to scalability, testability, stability, maintainability and readability. In the current folder you are given a legacy project \"ICU\". I need you to check the '.github/workflows/build.yml' CI pipeline. What are your impressions about it? Would you change anything?",
  "You are an experienced software developer in test that cares about software best practicies, such as, but not limited to tests stability, readability and maintainability. In the current folder you are given a legacy project \"ICU\". I need you to check 'Verify API Endpoints' step in the '.github/workflows/build.yml' pipeline. Is it acceptable or would you change anything?"
)

# Function to format duration
format_duration() {
  local ms=$1
  if [ $ms -lt 1000 ]; then
    echo "${ms}ms"
  else
    local seconds=$((ms / 1000))
    local minutes=$((seconds / 60))
    local hours=$((minutes / 60))
    
    if [ $hours -gt 0 ]; then
      echo "$((hours))h $((minutes % 60))m $((seconds % 60))s"
    elif [ $minutes -gt 0 ]; then
      echo "$((minutes))m $((seconds % 60))s"
    else
      echo "${seconds}s"
    fi
  fi
}

echo "\nStarting script...\n"

for model in "${MODELS[@]}"; do
  echo "\n--- Using Model: $model ---\n"
  
  for prompt in "${PROMPTS[@]}"; do
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
    echo ""
    echo "\n[$timestamp] Running prompt: \"${prompt:0:50}...\"\n"
    
    start_time=$(date +%s%N | cut -b1-13)
    
    # Use opencode run command with attach to the running server
    result=$(opencode run --attach "$OPENCODE_URL" "$prompt" --format json 2>&1)
    
    end_time=$(date +%s%N | cut -b1-13)
    elapsed_time=$((end_time - start_time))
    
    echo "\nResponse received in $(format_duration $elapsed_time)\n"
    echo "--- Response ---"
    
    # Pretty print JSON if jq is available, otherwise print raw
    if command -v jq &> /dev/null; then
      echo "$result" | jq . 2>/dev/null || echo "$result"
    else
      echo "$result"
    fi
    
    echo "--- End Response ---"
  done
done

echo "\nMake some sounds\n"

if command -v afplay &> /dev/null; then
  for sound in /System/Library/Sounds/*; do
      if [ -f "$sound" ]; then
          afplay "$sound"
      fi
  done

echo "\nScript finished.\n"
