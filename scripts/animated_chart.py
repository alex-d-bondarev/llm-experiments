import re
import os
import time
from typing import NamedTuple

GRAPH_NAME = "A new list is born"
PADDING = 4
TERMINAL_WIDTH = 100

max_numeric_val = 0


class ParsedRecord(NamedTuple):
    name: str
    str_value: str
    num_value: int


def calculate_progress_and_draw(data, num_frames=24):
    parsed_data = _parse_dict(data)
    global max_numeric_val
    max_numeric_val = max(v for v in (record.num_value for record in parsed_data) if v is not None)

    for i in range(num_frames + 1):
        progress = i / num_frames
        _draw_chart(parsed_data, animation_progress=progress)
        time.sleep(0.015)


def _parse_dict(data) -> list[ParsedRecord]:
    result = list()
    for key, value in data.items():
        result.append(
            ParsedRecord(name=key, str_value=value, num_value=_parse_value(value))
        )
    return result


def _parse_value(value):
    if isinstance(value, str):
        match = re.match(r'(\d+)', value)
        if match:
            return int(match.group(1))
    return None


def parse_value(value):
    if isinstance(value, str):
        match = re.match(r'(\d+)', value)
        if match:
            return int(match.group(1)), value
    return None, value


def _draw_chart(data: list[ParsedRecord], animation_progress=1.0):
    _clear_screen()
    print(GRAPH_NAME)
    _print_delimiter()

    longest_name = max(len(record.name) for record in data)

    print(f"{' ' * longest_name} |")

    for record in data:
        left_column = f"{record.name.ljust(longest_name)}"

        if record.num_value is not None:
            _print_with_bar(animation_progress, left_column, record)
        else:
            print(f"{left_column} | {record.str_value}")

        print(f"{' ' * longest_name} |")

    _print_delimiter()


def _print_with_bar(animation_progress: float, left_column: str, record: ParsedRecord):
    available_width = TERMINAL_WIDTH - len(left_column) - PADDING
    global max_numeric_val

    bar_length = int((record.num_value / max_numeric_val) * available_width)

    animated_length = int(bar_length * animation_progress)
    right_column = '￭' * animated_length

    if animation_progress >= 1.0:
        right_column = f"{right_column} {record.str_value}"

    print(f"{left_column} | {right_column}")


def _clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')


def _print_delimiter():
    print("-" * (TERMINAL_WIDTH + PADDING))


if __name__ == "__main__":
    calculate_progress_and_draw({
        "cogito:3b-v1-preview-llama-fp16": "7.2GB",
        "gemma4:e2b-it-q4_K_M": "7.2GB",
        "granite3.3:8b": "4.9GB",
        "hermes3:8b-llama3.1-q6_K": "6.6GB",
        "llama3.2:3b-instruct-fp16": "6.4GB",
        "ministral-3:3b-instruct-2512-fp16": "7.7GB",
        "mistral-nemo:12b-instruct-2407-q4_K_M": "7.5GB",
        "nemotron-3-nano:4b-bf16": "5.1GB",
        "phi4-mini:3.8b-fp16": "7.7GB",
        "qwen2.5-coder:14b-instruct-q3_K_L": "7.9GB",
        "qwen3.5:9b-q4_K_M": "6.6GB",
        "rnj-1:8b-instruct-q4_K_M": "5.1GB",
        "smollm2:1.7b-instruct-fp16": "3.4GB",
        "starcoder2:7b-q8_0": "7.6GB",
    })
