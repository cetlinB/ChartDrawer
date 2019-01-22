import {Component} from "react";
import React from "react";
import ReactDataSheet from 'react-datasheet';
import Input from "@material-ui/core/Input/Input";
import {MdAdd, MdRemove} from "react-icons/md";
import Typography from "@material-ui/core/Typography/Typography";
import '../styles.css';

const nonDataRows = 3;

class MyAddEmptyDataButton extends Component {
    render() {
        return (
        <Typography align="center" variant="display1" onClick={()=>this.props.onClick()}>
            <MdAdd />
        </Typography>
    )};
}

class MyRemoveDataButton extends Component {
    render() {
        return (
            <Typography align="center" variant="display1" onClick={()=>this.props.onClick()}>
                <MdRemove />
            </Typography>
        )};
}

class MyDataSheet extends Component {

    onCellsChanged(changes) {
        changes.forEach(({cell, row, col, value}) => {
            if (row === 0) {
                this.props.setLabelByIndex(value, col);
            } else if (row === 1) {
                console.log('CAN"T EDIT XY ROW');
            } else {
                const setIndex = Math.floor(col / 2);
                const dataIndex = row - 3;
                const newData = this.props.dataSets.series[setIndex].data[dataIndex];

                if (col % 2) {
                    newData[1] = Number(value);
                } else {
                    newData[0] = Number(value);
                }

                console.log((newData));

                this.props.addNewDataByDataSetIndex(newData, setIndex, dataIndex);
            }
        });
    }

    generateGrid() {

        const colPointLength =  this.props.dataSets.series.length;
        const rowPointLength = colPointLength > 0 ? this.props.dataSets.series[0].data.length : 0;

        //LABEL ROW
        let grid = [
            this.props.dataSets.series.map( set => (
                {
                    component:(<LabelColorCell text={set.name} color={set.color} setColorByIndex={this.props.setColorByIndex} setLabelByIndex={this.props.setLabelByIndex} index={set.index}/>),
                    forceComponent: true,
                    className: "cell-label",
                    colSpan: 2
                })),
        ];

        if( rowPointLength === 0 ) {
            grid = [[]];
        }

        //COLOR ROW
        grid.push(
            this.props.dataSets.series.map( set => ({
                    component: (<button onClick={() => this.props.removeSeries(set.index)}>
                                 Usuń
                                </button>),
                    forceComponent: true,
                    readOnly: true,
                    colSpan: 2
                }
            )
            )
        );

        //XY ROW
        grid.push([].concat(...this.props.dataSets.series.map( () => (
            [
                {value: 'x', readOnly: true},
                {value: 'y', readOnly: true}
            ]
        ))));

        //DATA
        for( let row = 0 ; row < rowPointLength ; row++ ){
            let pointRow = [];

            for( let col = 0 ; col < colPointLength ; col++ ){
                const point = this.props.dataSets.series[col].data[row];
                pointRow.push(
                        {value: `${point[0]}`},
                        {value: `${point[1]}`}
                        );
            }

            grid.push(pointRow);
        }

        //ADD COLUMN BUTTON COLUMN
        grid[0].push({
            className: "cell-add-button",
            component: (<MyAddEmptyDataButton onClick={()=>this.props.addNewEmptyDataSet()}/>),
            forceComponent: true,
            readOnly: true,
            rowSpan: rowPointLength + nonDataRows
        });

        //ADD ROW BUTTON ROW
        grid.push([{
            className: "cell-add-button",
            component: (<MyAddEmptyDataButton onClick={()=>this.props.addNewEmptyDataToEverySet()} />),
            forceComponent: true,
            readOnly: true,
            colSpan:  colPointLength
        },{
            className: "cell-add-button",
            component: (<MyRemoveDataButton onClick={()=>this.props.removeRovFromEverySet()} />),
            forceComponent: true,
            readOnly: true,
            colSpan:  colPointLength
        }
        ]);

        return grid;
    }

    render() {
        return (
            <ReactDataSheet
                data={this.generateGrid()}
                valueRenderer={(cell) => cell.value}
                onCellsChanged={changes => this.onCellsChanged(changes)}
            />
        );
    };
}

export default MyDataSheet;

class LabelColorCell extends React.Component {
    render(){
        return(
            <div>
                <Input className="labelBlock" type="plain/text" value={this.props.text} onChange={(e) => this.props.setLabelByIndex(e.target.value,this.props.index)}/>
                <cell>
                <Input
                        className="cell-label labelBlock"
                        type="color"
                       value={this.props.color}
                       onChange={ event=>this.props.setColorByIndex(event.target.value, this.props.index)}/>
                </cell>
            </div>
                );
    }
}

class ContextMenu extends React.Component {
    state = {
        visible: false,
    };

    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this._handleContextMenu);
        document.removeEventListener('click', this._handleClick);
        document.removeEventListener('scroll', this._handleScroll);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();

        this.setState({ visible: true });

        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }

        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }

        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }

        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (wasOutside && visible) this.setState({ visible: false, });
    };

    _handleScroll = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false, });
    };

    render() {
        const { visible } = this.state;

        return(visible || null) &&
            <div ref={ref => {this.root = ref}} className="contextMenu">
                <div className="contextMenu--option">Share this</div>
                <div className="contextMenu--option">New window</div>
                <div className="contextMenu--option">Visit official site</div>
                <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
                <div className="contextMenu--option">Settings</div>
                <div className="contextMenu--separator" />
                <div className="contextMenu--option">About this app</div>
            </div>
    };
}