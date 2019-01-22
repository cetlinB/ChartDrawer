import React, {Component} from "react";
import {cellSeparator, rowSeparator} from "../constants/CsvSeparators";
import Button from "@material-ui/core/Button";

class ReadCsv extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {resetKey: ""};
    }

    onSubmit(event) {
        let reader = new FileReader();
        try {
            reader.readAsText(this.fileInput.current.files[0]);
            reader.onload = (e) => {
                this.setState({resetKey: this.state.resetKey + "R"});
                this.decodeCSV(e.target.result);
            }
        } catch (TypeError) {
            console.error(TypeError.toString());
        }
    }

    decodeCSV(data) {
        let rows = data.split(rowSeparator);

        rows.splice(0,1);

        rows.splice(rows.length-1,1);

        rows = rows.map(row => {
            return row.split(cellSeparator);
        });

        let readState = [];
        for (let col = 0; col < rows[0].length; col += 2) {
            let rowPoints = [];
            rows.forEach((row) => {
                rowPoints.push([Number(row[col]),Number(row[col+1])]);
            });
            readState.push(rowPoints);
        }
            this.props.setPureData(readState);


    }

    render() {
        return (
            <div className="file-input-button">
                <input
                    accept="text/csv"
                    id="contained-button-file"
                    key={this.state.resetKey || ''}
                    onChange={e => this.onSubmit(e)}
                    ref={this.fileInput}
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" color="default" width={300}>WCZYTAJ DANE</Button>
                </label>
            </div>
        );
    }
}

export default ReadCsv;