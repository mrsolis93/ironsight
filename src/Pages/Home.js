import React, {Component} from 'react'
import '../App.css';
import UsersWidget from '../Components/Widgets/UsersWidget';
import WidgetTemplate from '../Components/Widgets/WidgetTemplate';
import {Rnd} from 'react-rnd';


class Home extends Component {
   
  
    render() {
      return (
  
        <><div className="App">
          <div className="App-header"></div>
          <Rnd>
          <UsersWidget />
          </Rnd>
          <Rnd>
          <WidgetTemplate />
          </Rnd>
        </div>
        </>
     
        );
    }

}

export default Home
