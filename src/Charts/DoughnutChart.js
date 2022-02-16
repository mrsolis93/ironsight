import React,{useState, useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend

)
var elkData = []
const DoughnutChart = () => {

    const [chart, setChart] = useState([])

    var baseUrl = "https://api.tylerharrison.dev/get.php?q=%27{%22size%22:100,%22aggs%22:{%22hostnames%22:{%22terms%22:{%22field%22:%22host.name%22,%22size%22:100}}}}%27";
    
    useEffect(() => {
        const fetchData = async () => {
        fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
    
            }
            }).then((response) => {
                response.json().then(json => {
                    elkData = json.aggregations.hostnames.buckets
                    setChart(elkData)
    
                })
            }).catch(error => {
                console.log(error)
            })
                    
        }
        fetchData()
    
    }, [baseUrl]) 
    
    for (var key in elkData) {
        console.log(elkData[key].doc_count)
    }

    //this function below enters buckets and grabs the keys from inside of buckets
    var Xaxis = chart.map(function(x) {
    return x.key;
    });
    //this function below enters buckets and grabs the doc_count value from inside of buckets
    var Yaxis = chart.map(function(y) {
    return y.doc_count;
    });

var data  = {
    //fill labels in with the buckets
    labels:Xaxis,  //x-axis
        datasets: [{
            data:Yaxis,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        }]
    }
    var options = {
        maintainAspectRatio: false,
        
    }
    
    return (
        <div>
        <Doughnut
            data={data}
            height={400}
            options={options}
        />
        </div>
    )
    }  

    export default DoughnutChart