import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [databaseCount, setDatabaseCount] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/api', {
      headers: {
        'x-api-key': '29455654ad0546c7a82641ca8f9dd9f887bdafde5cf1466cad0eda930463c6e4' // In a real app, this would be stored securely
      }
    })
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notion API Integration</h1>
        <p>{message}</p>
        {databaseCount !== null && (
          <p>Number of databases: {databaseCount}</p>
        )}
      </header>
    </div>
  );
}

export default App;
