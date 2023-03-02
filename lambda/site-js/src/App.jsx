import logo from './logo.svg';
import styles from './App.module.css';

function App(props) {
  return (
    <div >
      <header >
        <p>
          Sample render of page with <b>{props.id}</b>
        </p>
        <a
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
