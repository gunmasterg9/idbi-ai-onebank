"""
Local launcher script for IDBI AI OneBank
Concurrently runs FastAPI backend and Next.js frontend for local testing
"""

import os
import sys
import subprocess
import time
import socket
import shutil

# Ports used by the application
BACKEND_PORT = 8000
FRONTEND_PORT = 3000

# Base directory of the project
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")

# Ensure Node.js paths are in environment PATH if common installer paths exist
nodejs_path = r"C:\Program Files\nodejs"
if os.path.exists(nodejs_path) and nodejs_path not in os.environ.get("PATH", ""):
    os.environ["PATH"] = nodejs_path + os.path.pathsep + os.environ.get("PATH", "")

def is_port_open(port):
    """Check if a port is in use."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def kill_port_owner(port):
    """Free up ports if they are already occupied."""
    if sys.platform.startswith('win'):
        try:
            output = subprocess.check_output(f'netstat -aon | findstr :{port}', shell=True).decode()
            for line in output.strip().split('\n'):
                parts = line.split()
                if len(parts) > 4:
                    pid = parts[-1]
                    if pid != '0':
                        print(f"Stopping existing process on port {port} (PID: {pid})...")
                        subprocess.run(f"taskkill /F /PID {pid}", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except Exception:
            pass
    else:
        try:
            subprocess.run(f"lsof -t -i:{port} | xargs kill -9", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except Exception:
            pass

def setup_environment_files():
    """Copy .env.example to backend/.env and frontend/.env.local if they do not exist."""
    env_example = os.path.join(ROOT_DIR, ".env.example")
    if not os.path.exists(env_example):
        print("Warning: .env.example not found in root directory.")
        return

    backend_env = os.path.join(BACKEND_DIR, ".env")
    if not os.path.exists(backend_env):
        print("Copying .env.example to backend/.env...")
        shutil.copy(env_example, backend_env)
    
    frontend_env = os.path.join(FRONTEND_DIR, ".env.local")
    if not os.path.exists(frontend_env):
        print("Copying .env.example to frontend/.env.local...")
        shutil.copy(env_example, frontend_env)

def get_python_executable():
    """Get the path to the python executable in the virtual environment."""
    venv_dir = os.path.join(BACKEND_DIR, "venv")
    
    # Check if virtual environment exists, if not create it
    if not os.path.exists(venv_dir):
        print("Virtual environment (venv) not found in backend directory.")
        print("Creating virtual environment...")
        if shutil.which("uv"):
            print("Using 'uv' to create virtual environment...")
            subprocess.run(["uv", "venv", "venv"], cwd=BACKEND_DIR, check=True)
        else:
            subprocess.run([sys.executable, "-m", "venv", "venv"], cwd=BACKEND_DIR, check=True)
    
    # Determine the python executable path in the venv
    if sys.platform.startswith('win'):
        python_exe = os.path.join(venv_dir, "Scripts", "python.exe")
    else:
        python_exe = os.path.join(venv_dir, "bin", "python")
        
    if not os.path.exists(python_exe):
        # Fallback to system python if venv executable is missing
        print(f"Warning: Expected virtual environment Python at {python_exe} not found. Falling back to system Python.")
        return sys.executable
        
    return python_exe

def main():
    print("=" * 60)
    print("      IDBI AI OneBank - Local Concurrency Launcher")
    print("=" * 60)
    
    # 1. Clean up ports 8000 and 3000
    print("Checking and freeing ports...")
    kill_port_owner(BACKEND_PORT)
    kill_port_owner(FRONTEND_PORT)

    # 2. Setup Environment Variables
    setup_environment_files()

    # 3. Setup Python Virtual Environment and Install backend dependencies
    python_exe = get_python_executable()
    print(f"Using Python: {python_exe}")
    
    # Check if packages are installed by trying to import a key dependency, otherwise run installation
    try:
        # Check if fastapi is installed in the venv
        subprocess.run([python_exe, "-c", "import fastapi"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError:
        print("Backend dependencies not found in virtual environment. Installing requirements...")
        if shutil.which("uv"):
            print("Using 'uv' for super fast installation of requirements.txt...")
            subprocess.run(["uv", "pip", "install", "-r", "requirements.txt", "--python", python_exe], cwd=BACKEND_DIR, check=True)
        else:
            subprocess.run([python_exe, "-m", "pip", "install", "-r", "requirements.txt"], cwd=BACKEND_DIR, check=True)

    # 4. Start Backend FastAPI
    print("Starting FastAPI Backend (Port 8000)...")
    backend_process = subprocess.Popen(
        [python_exe, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=BACKEND_DIR
    )

    # Wait for backend to be online (embeddings/database loading can take a moment)
    print("Waiting for Backend to initialize...")
    retries = 45
    backend_ready = False
    while retries > 0:
        if is_port_open(BACKEND_PORT):
            backend_ready = True
            break
        time.sleep(1)
        retries -= 1

    if not backend_ready:
        print("Error: Backend failed to start on port 8000.")
        backend_process.terminate()
        return

    print("FastAPI Backend is online.")

    # 5. Start Next.js Frontend
    print("Starting Next.js Frontend (Port 3000)...")
    
    # Find npm executable dynamically (prioritize npm.cmd on Windows to avoid PowerShell execution policy errors)
    npm_cmd = "npm"
    possible_npms = [
        r"C:\Program Files\nodejs\npm.cmd",
        r"C:\Program Files (x86)\nodejs\npm.cmd",
        os.path.expanduser(r"~\AppData\Roaming\npm\npm.cmd"),
        "npm.cmd",
        "npm"
    ]
    for n in possible_npms:
        if shutil.which(n) or os.path.exists(n):
            npm_cmd = f'"{n}"' if " " in n else n
            break

    # Check if node_modules exists
    if not os.path.exists(os.path.join(FRONTEND_DIR, "node_modules")):
        print("Frontend dependencies (node_modules) not found. Running npm install...")
        subprocess.run(f"{npm_cmd} install --legacy-peer-deps", shell=True, cwd=FRONTEND_DIR)

    frontend_process = subprocess.Popen(
        f"{npm_cmd} run dev",
        shell=True,
        cwd=FRONTEND_DIR
    )

    # Wait for frontend to be online
    retries = 45
    frontend_ready = False
    while retries > 0:
        if is_port_open(FRONTEND_PORT):
            frontend_ready = True
            break
        time.sleep(1)
        retries -= 1

    if not frontend_ready:
        print("Error: Frontend failed to start on port 3000.")
        backend_process.terminate()
        frontend_process.terminate()
        return

    print("\n" + "=" * 60)
    print(" [SUCCESS] IDBI AI OneBank is running locally!")
    print("=" * 60)
    print("  * Web UI:            http://localhost:3000")
    print("  * Backend API Docs:  http://localhost:8000/docs")
    print("=" * 60)
    print("Press CTRL+C to terminate both processes.")
    print("=" * 60 + "\n")

    # Monitor output and wait for interrupt
    try:
        while True:
            # Check if either process terminated
            if backend_process.poll() is not None:
                print("Backend terminated unexpectedly.")
                break
            if frontend_process.poll() is not None:
                print("Frontend terminated unexpectedly.")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down servers...")
    finally:
        # Gracefully terminate both processes
        backend_process.terminate()
        frontend_process.terminate()
        
        # Give them a moment to terminate
        time.sleep(1.5)
        kill_port_owner(BACKEND_PORT)
        kill_port_owner(FRONTEND_PORT)
        print("Shutdown complete.")

if __name__ == "__main__":
    main()
