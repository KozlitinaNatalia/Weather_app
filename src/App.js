import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather city="New York" />
      </div>
      <footer>
        <a
          href="https://github.com/KozlitinaNatalia/Weather_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-source code{" "}
        </a>
        by Nataliia Kozlitina
      </footer>
    </div>
  );
}

export default App;
