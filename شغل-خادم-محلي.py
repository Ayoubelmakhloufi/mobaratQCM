"""Optional localhost server. Python 3 required; no packages needed."""
import http.server,socketserver,os,webbrowser
os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT=8765
socketserver.TCPServer.allow_reuse_address=True
with socketserver.TCPServer(('127.0.0.1',PORT),http.server.SimpleHTTPRequestHandler) as httpd:
    print(f'Meyar: http://127.0.0.1:{PORT} — Ctrl+C to stop')
    webbrowser.open(f'http://127.0.0.1:{PORT}')
    try: httpd.serve_forever()
    except KeyboardInterrupt: pass
