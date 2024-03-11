import {useState} from 'react';
import reactLogo from './assets/react.svg';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <main className="Main-Container mt-5 flex flex-col items-center">
        <Header />
        <div>
          <a
            href="https://vitejs.dev"
            target="_blank"
          >
            <img
              src="/vite.svg"
              className="logo"
              alt="Vite logo"
            />
          </a>
          <a
            href="https://reactjs.org"
            target="_blank"
          >
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is now {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR!
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </div>
  );
}

export default App;
