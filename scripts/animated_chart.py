import re
import os
from typing import NamedTuple


GRAPH_NAME = "Initial models"
PADDING = 3
TERMINAL_WIDTH = 100
max_numeric_val = 0


class ParsedRecord(NamedTuple):
    name: str
    str_value: str
    num_value: int


def calculate_progress_and_draw(data, num_frames=12):
    parsed_data = _parse_dict(data)
    global max_numeric_val
    max_numeric_val = max(v for v in (record.num_value for record in parsed_data) if v is not None)

    for i in range(num_frames + 1):
        progress = i / num_frames
        _draw_chart(parsed_data, animation_progress=progress)


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

    for record in data:
        left_column = f"{record.name.ljust(longest_name)}"

        if record.num_value is not None:
            _print_with_bar(animation_progress, data, left_column, record)
        else:
            print(f"{left_column} | {record.str_value}")

    _print_delimiter()


def _print_with_bar(animation_progress: float, data: list[ParsedRecord], left_column: str, record: ParsedRecord):
    available_width = TERMINAL_WIDTH - len(left_column) - PADDING
    global max_numeric_val

    bar_length = int((record.num_value / max_numeric_val) * available_width)

    animated_length = int(bar_length * animation_progress)
    right_column = '█' * animated_length

    if animation_progress >= 1.0:
        right_column = f"{right_column} {record.str_value}"

    print(f"{left_column} | {right_column}")


def _clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')


def _print_delimiter():
    print("-" * 30)


if __name__ == "__main__":
    calculate_progress_and_draw({
        "A": "cloud",
        "B": "9GB",
        "C": "13GB",
        "D": "14GB"
    })
