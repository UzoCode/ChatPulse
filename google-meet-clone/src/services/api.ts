import { getIdToken } from './auth';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your ChatPulse server URL

export async function exchangeToken(): Promise<string> {
  try {
    const idToken = await getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/auth/exchange_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error exchanging token:', error);
    throw error;
  }
}

// Add other API calls here as needed