import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [databaseCount, setDatabaseCount] = useState(null);
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    fetch('/.netlify/functions/api')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setDatabaseCount(data.databases);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to connect to API');
      });
  }, []);

  const handleAddTestText = async () => {
    console.log('Button clicked');
    try {
      console.log('Sending request to add test text');
      const response = await fetch('/.netlify/functions/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'add-test-text' }),
      });
      const data = await response.json();
      console.log('Response received:', data);
      setTestMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setTestMessage('Failed to add test text');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notion API Integration</h1>
        <p>{message}</p>
        {databaseCount !== null && (
          <p>Number of databases: {databaseCount}</p>
        )}
        <button onClick={handleAddTestText}>Add Test Text to Notion</button>
        {testMessage && <p>{testMessage}</p>}
      </header>
    </div>
  );
}

export default App;
