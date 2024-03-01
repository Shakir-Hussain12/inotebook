import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth').then((res) => res.json()).then((ans) => {
      setData(ans);
    });
  }, []);

  let key = 'abca1';
  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexDirection: 'row' }}>
        {
          data.length !== 0 ? (data.map((person) => {
            key += 1;
            return (
              <div
                key={key}
                style={
                {
                  border: '1px solid red',
                  padding: '2%',
                  marginInlineEnd: '2%',
                  wordBreak: 'break-word',
                }
              }
              >
                <p>{person.full_name}</p>
                <p>{person.name}</p>
                <p>{person.email}</p>
                <p>{person.password}</p>
                <p>{person.phone_no}</p>
              </div>
            );
          })) : (<p>No data</p>)
        }
      </header>
    </div>
  );
}

export default App;
