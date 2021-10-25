import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css'

function App() {
  
  return(
    <div className="App">
      <h1 style={{margin:0}}>Ironsight</h1>
  <Tabs>
    <TabList>
      <Tab>
       <p> Home </p>
      </Tab>
      <Tab>
        <p>Users</p>
      </Tab>
      <Tab>
        <p>Labs</p>
      </Tab>
      <Tab>
        <p>Resource</p>
      </Tab>
      <Tab>
        <p>Analysis</p>
      </Tab>
      <Tab>
        <p>Sandbox</p>
      </Tab>

    </TabList>
    <TabPanel>
      <div classname="panel-content">
        <h2>landing page</h2>
      </div>
    </TabPanel>
    <TabPanel>
      <div classname="panel-content">
        <h2>Users</h2>
      </div>
    </TabPanel>
    <TabPanel>
      <div classname="panel-content">
        <h2>Labs</h2>
      </div>
    </TabPanel>
    <TabPanel>
      <div classname="panel-content">
        <h2>Graphs</h2>
      </div>
    </TabPanel>
    <TabPanel>
      <div classname="panel-content">
        <h2>Analysis</h2>
      </div>
    </TabPanel>
    <TabPanel>
      <div classname="panel-content">
        <h2>Sandbox</h2>
      </div>
    </TabPanel>
    </Tabs>
    </div>
  );
}

const  rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;

    



 


