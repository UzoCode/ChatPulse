import requests
import json

BASE_URL = 'http://127.0.0.1:5000/api'

def test_endpoint(method, endpoint, data=None, token=None):
    url = f"{BASE_URL}{endpoint}"
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    
    if method == 'GET':
        response = requests.get(url, headers=headers)
    elif method == 'POST':
        response = requests.post(url, headers=headers, data=json.dumps(data))
    elif method == 'PUT':
        response = requests.put(url, headers=headers, data=json.dumps(data))
    elif method == 'DELETE':
        response = requests.delete(url, headers=headers)
    
    print(f"\nTesting {method} {endpoint}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {response.json()}")
    except json.JSONDecodeError:
        print(f"Response (not JSON): {response.text}")
    return response

def run_tests():
    # Test authentication endpoints
    register_response = test_endpoint('POST', '/auth/register', {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpassword'})
    login_response = test_endpoint('POST', '/auth/login', {'email': 'test@example.com', 'password': 'testpassword'})
    
    # Extract token for authenticated requests
    token = login_response.json().get('access_token') if login_response.status_code == 200 else None
    
    # Test chat endpoints
    test_endpoint('GET', '/chat/messages', token=token)
    test_endpoint('POST', '/chat/messages', {'content': 'Test message'}, token=token)
    
    # Test admin endpoints (assuming they exist)
    test_endpoint('GET', '/admin/users', token=token)
    
    # Test settings endpoints (assuming they exist)
    test_endpoint('GET', '/settings/profile', token=token)
    test_endpoint('PUT', '/settings/profile', {'username': 'updateduser'}, token=token)

if __name__ == '__main__':
    run_tests()