import subprocess
import sys

def sync_lockfile():
    print("Syncing pnpm-lock.yaml with package.json...")
    result = subprocess.run(['pnpm', 'install'], capture_output=True, text=True)
    if result.returncode != 0:
        print("Error syncing lockfile:", result.stderr)
        sys.exit(1)
    else:
        print("Lockfile synced successfully.")

if __name__ == "__main__":
    sync_lockfile() 