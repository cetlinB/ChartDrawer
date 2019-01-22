import {Component} from "react";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class UniversalChart extends Component {

    render () {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={this.props.options}
            />
        );
    }


}

export default UniversalChart;