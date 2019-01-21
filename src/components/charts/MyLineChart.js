import {Component} from "react";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
    title: {
        text: 'My chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears']
    },
    yAxis: {
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    chart: {
        type: 'scatter'
    },
    series: [{
            color: '#00ff00',
            name: 'zieloni',
            data: [1, 2]
        },
        {
            color: '#ffff00',
            name: 'żółci',
            data: [[4, 6],[2,6],[4.5, 6.534],[8,1],[5, 7],[3,4]]
        },
        {
            color: '#7f000f',
            data: [
          [1, 1],
          [2, 6],
           [4, 5],
            [7, 1],
            [8, 1]
            ]
        }]
};

class MyLineChart extends Component {

    render () {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={this.props.options}
            />
        );
    }


}

export default MyLineChart;