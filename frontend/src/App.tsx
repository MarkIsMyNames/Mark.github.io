import React, { useEffect, useState } from 'react';
import './App.css';

interface HealthStatus {
  status: string;
}

interface BackendMessage {
  message: string;
}

function App(): React.JSX.Element {
  const [message, setMessage] = useState<string>('');
  const [health, setHealth] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const messageResponse = await fetch('http://localhost:5000/');
        const messageData: BackendMessage = await messageResponse.json();
        setMessage(messageData.message);

        const healthResponse = await fetch('http://localhost:5000/api/health');
        const healthData: HealthStatus = await healthResponse.json();
        setHealth(healthData.status);
      } catch (error) {
        setMessage('Failed to connect to backend');
        setHealth('unhealthy');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + TypeScript + Flask</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{message}</p>
            <p>Backend health: {health}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
