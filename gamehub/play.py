
import http.server
import socketserver
import webbrowser
import os
import sys

# Configuration
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    # Change to the script's directory so paths work correctly
    os.chdir(DIRECTORY)
    
    # Allow address reuse to prevents "Address already in use" errors on restart
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n==================================================")
        print(f"   Technophiles GameHub Server Running!")
        print(f"   Opening {url} ...")
        print(f"   Press Ctrl+C to stop the server.")
        print(f"==================================================\n")
        
        # Open browser automatically
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server...")
            sys.exit(0)

if __name__ == "__main__":
    start_server()
