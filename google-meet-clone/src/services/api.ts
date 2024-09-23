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
      credentials: 'include', // This is important for including cookies
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.message; // Return the message from the server
  } catch (error) {
    console.error('Error exchanging token:', error);
    throw error;
  }
}

// Create a new meeting
export async function createMeeting(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
}

// Join an existing meeting
export async function joinMeeting(meetingId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error joining meeting:', error);
    throw error;
  }
}

// Get meeting details
export async function getMeetingDetails(meetingId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting meeting details:', error);
    throw error;
  }
}

// End a meeting
export async function endMeeting(meetingId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error ending meeting:', error);
    throw error;
  }
}

// Send a message
export async function sendMessage(meetingId: string, message: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Get messages
export async function getMessages(meetingId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}