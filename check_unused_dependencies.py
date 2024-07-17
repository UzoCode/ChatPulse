import os

requirements_path = 'backend/requirements.txt'

required_packages = set()
with open(requirements_path) as f:
    required_packages = {line.split('==')[0] for line in f if line.strip()}

used_packages = set()
for root, dirs, files in os.walk('backend'):
    for file in files:
        if file.endswith('.py'):
            with open(os.path.join(root, file)) as f:
                for line in f:
                    for package in required_packages:
                        if package in line:
                            used_packages.add(package)

unused_packages = required_packages - used_packages

print("Unused packages:", unused_packages)