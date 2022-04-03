import React, {Component} from 'react'
import '../App.css';
import UsersWidget from '../Components/Widgets/UsersWidget';
import WidgetTemplate from '../Components/Widgets/WidgetTemplate';
import RecordsWidget from '../Components/Widgets/RecordsWidget';


class Home extends Component {
   
  
    render() {
      return (
  
        <><div className="App">
          <div className="App-header"></div>
          <UsersWidget />
          <WidgetTemplate />
          <RecordsWidget />
        </div>
        </>
     
        );
    }

}

export default Home
