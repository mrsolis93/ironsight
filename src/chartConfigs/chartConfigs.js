
export const UserChartOptions = 

{
        lineHeightAnnotation: 
        {
            always: true,
            hover: false,
            lineWeight: 1.5
        },

            responsive: true,
            tooltips: 
            {
                mode: 'index',
                intersect: false,
            },

        animation: 
        {
            duration: 2000
        },

        maintainAspectRatio: false,

        responsive: true,

        hover: 
        {
            mode: 'nearest',
            intersect: true
        },

        scales:
        {
            xAxes:
            [
                {
                    type: "time",
                    distribution: "linear"
                }
            ],
            yAxes: 
            [{
                ticks: 
                {
                    beginAtZero: true
                }
            }]
        },

        legend: 
        {
            display: true,
            position: 'bottom',
            labels:
            {
                fontColor: 'rgba(242, 38, 19, 1)'
            }
        }


}


