import logo from './logo.svg';
import Iframe from 'react-iframe'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ironsight - Systems Analysis and Design <br></br>
          Under Construction 2021
        </p>
        <Iframe url="https://netdata.tylerharrison.dev/"
        width="100%"
        height="700px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
      </header>
    </div>
  );
}


export default App;
