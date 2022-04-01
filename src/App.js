import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([], 'data');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true);
        let response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        let data = await response.json();
        setData(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [setData])

  return (
    <div className="App">
      <header className="App-header">
        Bulls Injury Report
      </header>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data.map(player => {
        return (
          <div key={player.name}>
            <h3>{player.name}</h3>
            <p>{player.position}</p>
            <p>{player.date}</p>
            <p>{player.status}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
