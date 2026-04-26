#!/bin/bash

# Configuration
MODELS=(
  "github-copilot/gpt-4.1"
)

PROMPTS=(
  "Hello there!",
  "What is your name?"
)

OPENCODE_URL="http://127.0.0.1:4096"

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

echo "Starting script..."

for model in "${MODELS[@]}"; do
  echo ""
  echo "--- Using Model: $model ---"
  
  for prompt in "${PROMPTS[@]}"; do
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
    echo ""
    echo "[$timestamp] Running prompt: \"${prompt:0:50}...\""
    
    start_time=$(date +%s%N | cut -b1-13)
    
    # Use opencode run command with attach to the running server
    result=$(opencode run --attach "$OPENCODE_URL" "$prompt" --format json 2>&1)
    
    end_time=$(date +%s%N | cut -b1-13)
    elapsed_time=$((end_time - start_time))
    
    echo "Response received in $(format_duration $elapsed_time)"
    echo ""
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

echo ""
echo "Script finished."
