import {Component} from "react";
import React from "react";
import ReactDataSheet from 'react-datasheet';
import Input from "@material-ui/core/Input/Input";
import {MdAddCircleOutline} from "react-icons/md";
import Typography from "@material-ui/core/Typography/Typography";
import {isPointValid} from "../utils/utils";

const nonDataRows = 3;

class MyAddEmptyDataButton extends Component {
    render() {
        return (
        <Typography align="center" variant="display1" onClick={()=>this.props.onClick()}>
            <MdAddCircleOutline />
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
                const newData = this.props.dataSets.series[setIndex].data;

                if (col % 2) {
                    newData.y = value;
                } else {
                    newData.x = value;
                }

                newData.valid = isPointValid(newData);

                this.props.addNewDataByDataSetIndex(newData, setIndex, dataIndex);
            }
        });
    }

    generateGrid() {

        const colPointLength =  this.props.dataSets.series.length;
        const rowPointLength = colPointLength > 0 ? this.props.dataSets.series[0].data.length : 0;
        console.log(rowPointLength);

        //LABEL ROW
        let grid = [
            this.props.dataSets.series.map( set => (
                {
                    value: set.name,
                    className: "cell-label",
                    colSpan: 2
                })),
        ];

        if( rowPointLength === 0 ) {
            grid = [[]];
        }

        //COLOR ROW
        grid.push(
            this.props.dataSets.series.map( set => (
                {
                    component: (<Input type="color"
                                       value={set.color}
                                       fullWidth={true}
                                       onChange={ event=>this.props.setColorByIndex(event.target.value, set.index)}/>),
                    forceComponent: true,
                    readOnly: true,
                    colSpan: 2
                })
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
            colSpan: 2 * colPointLength
        }]);

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
