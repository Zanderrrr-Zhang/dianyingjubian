#!/bin/bash
# 双击运行（如提示无权限：在终端执行 chmod +x start-mac.command）
cd "$(dirname "$0")"
PORT=8000
if command -v node >/dev/null 2>&1; then
  node tools/serve.mjs "$PORT"
else
  (sleep 1; open "http://localhost:$PORT/") &
  python3 -m http.server "$PORT" --bind 127.0.0.1
fi
