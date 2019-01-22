import React, {Component} from "react";
import {cellSeparator, rowSeparator} from "../constants/CsvSeparators";
import Button from "@material-ui/core/Button";

class DownloadCsv extends Component {

    encodeCSV() {
        let data = [];
        let line = [];
        this.props.dataSets.series.forEach(() => {
            line.push('x');
            line.push('y')
        });

        line.join(cellSeparator);
        data.push(line);
        data.push(rowSeparator);

        for (let i = 0; i < this.props.dataSets.series[0].data.length; i++) {
            let row = [];

            this.props.dataSets.series.forEach((dataset) => {
                row.push(dataset.data[i][0]);
                row.push(dataset.data[i][1]);
            });
            row.join(cellSeparator);
            data.push(row);
            data.push(rowSeparator);
        }

        let properties = {type: 'text/plain'};
        let file;
        try {
            file = new File(data, "csv_download.csv", properties);
        } catch (e) {
            file = new Blob(data, properties);
        }
        return URL.createObjectURL(file);
    }

    render() {
        return (
            <a href={this.encodeCSV()} download="csv_file.csv"><Button variant="contained" component="span" color="default">ZAPISZ DANE</Button></a>
        );
    }
}

export default DownloadCsv;