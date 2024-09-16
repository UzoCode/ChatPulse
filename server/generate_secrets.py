import secrets

def generate_secret_key():
    return secrets.token_hex(32)

if __name__ == "__main__":
    secret_key = generate_secret_key()
    jwt_secret_key = generate_secret_key()
    
    print("Generated new secret keys. Update your .env file with the following:")
    print(f"SECRET_KEY={secret_key}")
    print(f"JWT_SECRET_KEY={jwt_secret_key}")
    
    # Attempt to update the .env file automatically
    try:
        with open('.env', 'r') as f:
            env_contents = f.read()
        
        env_contents = env_contents.replace('SECRET_KEY=your_secret_key_here', f'SECRET_KEY={secret_key}')
        env_contents = env_contents.replace('JWT_SECRET_KEY=your_jwt_secret_key_here', f'JWT_SECRET_KEY={jwt_secret_key}')
        
        with open('.env', 'w') as f:
            f.write(env_contents)
        
        print("\nYour .env file has been updated automatically.")
    except Exception as e:
        print(f"\nError updating .env file: {e}")
        print("Please update your .env file manually with the above keys.")