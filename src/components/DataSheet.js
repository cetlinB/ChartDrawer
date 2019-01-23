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

class DataSheet extends Component {

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

        grid.push([].concat(...this.props.dataSets.series.map( () => (
            [
                {value: 'x', readOnly: true},
                {value: 'y', readOnly: true}
            ]
        ))));

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

        grid[0].push({
            className: "cell-add-button",
            component: (<MyAddEmptyDataButton onClick={()=>this.props.addNewEmptyDataSet()}/>),
            forceComponent: true,
            readOnly: true,
            rowSpan: rowPointLength + nonDataRows
        });

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

export default DataSheet;

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
