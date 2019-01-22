import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {EXAMPLE_POINT_DATA} from "../../constants/DataConstants";
import AreaChart from "recharts/es6/chart/AreaChart";
import Area from "recharts/es6/cartesian/Area";
import Button from "@material-ui/core/Button/Button";

var style = {
    width: "200px",
};

class UniversalChartButton extends React.Component {
    render() {
        return (
                <Button variant="contained" size={"medium"} component="span" color="primary" style={style} onClick={() => this.props.onClick()}>
                    {this.props.name}
                </Button>
        );
    }
}

export default UniversalChartButton;