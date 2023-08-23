const API_BASE_URL = 'http://localhost:7070';

export const sendMessageToAPI = async (message: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};
