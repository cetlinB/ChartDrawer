import React from "react";
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