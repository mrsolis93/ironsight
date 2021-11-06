import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IconContext } from "react-icons"
import { FaHome, FaUsers, FaBiohazard } from "react-icons/fa"
import { ImLab } from "react-icons/im"
import { GoGraph } from "react-icons/go"
import { MdTimeline } from "react-icons/md"

import './App.css'

function App() {
  
  

    return(
      
      <IconContext.Provider value={{color: "white" , size: "1.5em"}}>  
      <div className="App">
    <Tabs>
          <TabList>

              <Tab>
              <p><FaHome /> Home </p>
              </Tab>

              <Tab>
                <p><FaUsers /> Users</p>
              </Tab>

              <Tab>
                <p><ImLab /> Labs</p>
              </Tab>

              <Tab>
                <p><GoGraph /> Resource</p>
              </Tab>

              <Tab>
                <p><MdTimeline /> Analysis</p>
              </Tab>

              <Tab>
                <p><FaBiohazard /> Sandbox</p>
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
    </IconContext.Provider>
  );
}

const  rootElement = document.getElementById('root');
ReactDOM.render(<div className="fill-window">{<App />}</div> , rootElement);

export default App;

    



 


