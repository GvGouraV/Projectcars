import logo from './logo.svg';
import './App.css';

function App() {
  var port = process.env.PORT || 2410;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 className="bg-primary text-white">Welcome to react</h4>
        </a>
      </header>
    </div>
  );
}

export default App;
