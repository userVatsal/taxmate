import os
import subprocess
import sys

def check_sync():
    # Run pnpm install to check for any out-of-sync dependencies
    result = subprocess.run(['pnpm', 'install'], capture_output=True, text=True)
    if result.returncode != 0:
        print("Dependencies are out of sync. Updating...")
        # Optionally, you can add more logic here to handle the update
    else:
        print("All dependencies are in sync.")

if __name__ == "__main__":
    check_sync() 