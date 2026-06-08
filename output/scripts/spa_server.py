from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parents[2] / "build"
os.chdir(ROOT)

class SPAHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        requested = ROOT / self.path.lstrip("/").split("?", 1)[0]
        if self.path != "/" and not requested.exists() and "." not in requested.name:
            self.path = "/index.html"
        return super().do_GET()

ThreadingHTTPServer(("127.0.0.1", 3001), SPAHandler).serve_forever()
