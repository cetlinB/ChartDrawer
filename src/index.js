import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>
        </h1>
        <canvas>
        </canvas>
      </div>
    );
  }


}

class DataTable {
  constructor() {
    this.rows = {};
    this.nrows = 0;
    this.ncols = 0;
    this.colnames = [];
    this.rownames = [];
  }

  addRow(key, arr) {
    this.rows[key] = arr;
  }

  size() {

  }

  setSize(nr, nc) {

  }

  addCol(colname, arr) {
  }

  setColNames(arr) {

  }

  setRowNames(arr) {

  }

  setValue(r, c, val) {
    if (c < this.ncols && c >= 0) {
      if (r < this.nrows && r >= 0) {
        this.rows[r][c] = val;
      }
    }
  }

  value(r, c) {
    if(c < this.ncols && c >= 0){
      if (r < this.nrows && r >= 0) {
        return this.rows[r][c];
      }
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
