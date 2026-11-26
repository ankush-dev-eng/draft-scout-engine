import io
import json
import os
import pathlib
import duckdb
import zstandard as zstd
from typing import Generator, Dict, Any

class DataStreamer:
    """High-performance streaming engine for compressed GRID esports feeds."""
    
    def __init__(self, data_root: str = None):
        self.data_root = pathlib.Path(data_root or os.environ.get("STL_DATA_DIR", "../stl-hackathon-2026-grid-starter"))

    def stream_zst_feed(self, file_path: pathlib.Path) -> Generator[Dict[str, Any], None, None]:
        dctx = zstd.ZstdDecompressor()
        with open(file_path, "rb") as f:
            with dctx.stream_reader(f) as reader:
                text_stream = io.TextIOWrapper(reader, encoding="utf-8")
                for line in text_stream:
                    clean = line.strip()
                    if clean:
                        try:
                            yield json.loads(clean)
                        except json.JSONDecodeError:
                            continue

    def discover_series(self, game_type: str = "lol") -> list:
        target_dir = self.data_root / game_type
        if not target_dir.exists():
            return []
        return list(target_dir.glob("*.zst"))
