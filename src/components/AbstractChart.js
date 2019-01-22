import React, {Component} from "react";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import UniversalChart from "./charts/UniversalChart";
import VisibleInputCustomLabelDialog from "../containers/VisibleInputCustomLabelDialog";

class AbstractChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.chartParams.title,
            isTitleBeingChanged: false,
            labelChangeDialogOpen: false,
            labelChangeInfo: {
                currentLabel: undefined,
                dataSetIndex: undefined,
                dataIndex: undefined
            }
        }
    }

    handleTitleChanged(event){
        this.props.setTitle(this.state.title);
        this.setState({
            isTitleBeingChanged: false
        });
    }

    getTitleDomPart(){
        return this.state.isTitleBeingChanged
            ? (
                <FormControl>
                    <Input autoFocus={true}
                           value={this.state.title}
                           onChange={event => this.setState({title: event.target.value})}
                           onBlur={event => this.handleTitleChanged(event)}/>
                </FormControl>
            ) : (
                <Typography align="center"
                            variant="title"
                            onClick={() => this.setState({isTitleBeingChanged: true})}>
                    {this.props.chartParams.title}
                </Typography>
            );
    }

    initLabelChange(point, dataSetIndex, pointIndex){
        this.setState({
            labelChangeDialogOpen: true,
            labelChangeInfo: {
                currentLabel: point.label,
                dataSetIndex: dataSetIndex,
                dataIndex: pointIndex
            }
        });
    }

    render () {
        return (
            <div>
                <VisibleInputCustomLabelDialog open={this.state.labelChangeDialogOpen}
                                               handleClose={()=>this.setState({labelChangeDialogOpen: false})}
                                               {...this.state.labelChangeInfo} />
                {this.getTitleDomPart()}
                <UniversalChart options={this.props.dataSets}/>
            </div>
        );
    }


}

export default AbstractChart;