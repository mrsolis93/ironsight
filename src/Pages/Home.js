import React, {Component} from 'react'
import '../App.css';
//import UserChart from '../Components/UserChart.js';
import BarChart from '../Charts/BarChart';
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';


class Home extends Component {
   
  
    render() {
      return (
  
        <><div className="App">
          <div className="App-header"></div>
          <BarChart />
          <DoughnutChart />
          <LineChart />
          <PieChart />
        </div>
        </>
     
        );
    }

}

export default Home
