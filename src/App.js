import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css'

function App() {
  
  return(
    <div className="App">
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
      <div className="panel-content">
       
      </div>
    </TabPanel>
    <TabPanel>
      <div className="panel-content">
        
      </div>
    </TabPanel>
    <TabPanel>
      <div className="panel-content">
       
      </div>
    </TabPanel>
    <TabPanel>
      <div className="panel-content">
       
      </div>
    </TabPanel>
    <TabPanel>
      <div className="panel-content">
        
      </div>
    </TabPanel>
    <TabPanel>
      <div className="panel-content">
       
      </div>
    </TabPanel>
    </Tabs>
    </div>
  );
}

const  rootElement = document.getElementById('root');
ReactDOM.render(<div className="fill-window">{<App />}</div> , rootElement);

export default App;

    



 


