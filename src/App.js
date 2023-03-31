import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather city="New York" />
      </div>
      <footer>
        This project was coded by{" "}
        <a
          href="https://github.com/KozlitinaNatalia/Weather_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nataliia Kozlitina
        </a>{" "}
        and is open-sourced
      </footer>
    </div>
  );
}

export default App;
