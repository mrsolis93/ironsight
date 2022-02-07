import React,{useState, useEffect} from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { elkData } from './data.js'
import { array } from 'prop-types'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {

// const [chart, setChart] = useState([])

// var baseUrl = "http://ssh.tylerharrison.dev:9200/metrics-*/_search";
// //var proxyUrl = "https://cors-anywhere.herokuapp.com/";
// var apikey = "YU44dnIzNEJ0UFZoZkJIa19OYWs6emJRSk01LWhTMC1hNm0xMFBPUGZuUQ==";

// useEffect(() => {
//     const fetchData = async () => {
//     await fetch(`${baseUrl}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `${apikey}`,
//             'Access-Control-Allow-Origin': '*'

//         }
//         }).then((response) => {
//             response.json().then(json => {
//                 console.log(json)
//             })
//         }).catch(error => {
//             console.log(error)
//         })
                
//     }
//     fetchData()

//}, [baseUrl, apikey]) 


//this function below enters buckets and grabs the keys from inside of buckets
var Xaxis = elkData.map(x => x.buckets.map(function(x) {
return x.key;
}));
//this function below enters buckets and grabs the doc_count value from inside of buckets
var Yaxis = elkData.map(y => y.buckets.map(function(y) {
return y.doc_count;
}));

console.log(Xaxis);
console.log(Yaxis);


var data  = {
    //fill labels in with the buckets
    labels:Xaxis[0],  //x-axis
        datasets: [{
            data:Yaxis[0],
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
        scales: {
            y: {
                beginAtZero: true,
                autoskip: false,
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
    
    return (
        <div>
        <Bar
            data={data}
            height={300}
            options={options}
        />
        </div>
    )
    }  

    export default BarChart