import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Loading...');
  const [databaseCount, setDatabaseCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/api', {
      headers: {
        'x-api-key': '29455654ad0546c7a82641ca8f9dd9f887bdafde5cf1466cad0eda930463c6e4' // Replace with your actual API key
      }
    })
      .then(response => {
        setApiStatus(`API Response Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setApiStatus(prevStatus => `${prevStatus}, Data received`);
        if (data.message) {
          setApiStatus(prevStatus => `${prevStatus}, Message: ${data.message}`);
        }
        if (data.databases !== undefined) {
          setDatabaseCount(data.databases);
          setApiStatus(prevStatus => `${prevStatus}, Databases count received`);
        } else {
          setApiStatus(prevStatus => `${prevStatus}, No databases count in response`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(`Error: ${error.message}`);
        setApiStatus('Failed to connect to API');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notion API Integration</h1>
        <p>API Status: {apiStatus}</p>
        {databaseCount !== null && (
          <p>Number of databases: {databaseCount}</p>
        )}
        {error && <p style={{color: 'red'}}>{error}</p>}
        <details>
          <summary>Debug Info</summary>
          <pre>API Key used: {process.env.REACT_APP_API_KEY || 'Not set'}</pre>
          <pre>NODE_ENV: {process.env.NODE_ENV}</pre>
        </details>
      </header>
    </div>
  );
}

export default App;
