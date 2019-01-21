import React, { Component } from 'react';
import VisibleDataSheet from "../containers/VisibleDataSheet";
import VisibleFileReaderBtn from "../containers/VisibleFileReaderBtn";
import VisibleFileDownloadLink from "../containers/VisibleFileDownloadLink";
import VisibleChart from "../containers/VisibleChart";
import VisibleUndoButton from "../containers/VisibleUndoButton";
import VisibleRedoButton from "../containers/VisibleRedoButton";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Grid from "@material-ui/core/Grid/Grid";
import ExampleVerticalBarChart from "./exampleCharts/ExampleVerticalBarChart";
import ExampleHorizontalBarChart from "./exampleCharts/ExampleHorizontalBarChart";
import ExampleAreaChart from "./exampleCharts/ExampleAreaChart";
import ExamplePieChart from "./exampleCharts/ExamplePieChart";
import ExampleLineChart from "./exampleCharts/ExampleLineChart";
import ExampleScatterChart from "./exampleCharts/ExampleScatterChart";
import Paper from "@material-ui/core/Paper/Paper";
import Button from '@material-ui/core/Button/Button';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import MyLineChart from "./charts/MyLineChart";

class Layout extends Component {
    render() {
        return (
            <div id="app-content">
                <AppBar position="fixed">
                    <Toolbar className="bg-dark">
                        <Typography variant={"button"} color="inherit">
                            <ul className="nav navbar-nav-right">
                                <li className="nav-item active m-1">
                                    <VisibleUndoButton variant="contained" color="default">COFNIJ</VisibleUndoButton>
                                </li>
                                <li className="nav-item active m-1">
                                    <VisibleRedoButton variant="contained" color="default">POWTÓRZ</VisibleRedoButton>
                                </li>
                                <li className="nav-item active m-1">
                                    <VisibleFileReaderBtn/>
                                </li>
                                <li className="nav-item active m-1">
                                    <VisibleFileDownloadLink/>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        onClick={this.setChart}
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdownMenuLink"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        className="btn text-light"
                                    >
                                        Wykres

                                    </a>
                                    <input type="color" id="html5colorpicker" onChange="clickColor(0, -1, -1, 5)"
                                           value="#ff0000"/>
                                    <div
                                        className="dropdown-menu bg-light drop-list"
                                        aria-labelledby="navbarDropdownMenuLink"
                                    >
                                        <a className="dropdown-item" onClick={this.setMain} id="main">
                                            Utwórz nowy
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            onClick={this.props.onChange}
                                            id="save"
                                        >
                                            Zapisz
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            onClick={this.props.onChange}
                                            id="open"
                                        >
                                            Otwórz
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item active m-1">
                                    <Button variant="contained" component="span" color="default"
                                        href="http://nonsensopedia.wikia.com/wiki/Gra:Gra"
                                    >
                                        Pomoc<span className="sr-only">(current)</span>
                                    </Button>
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="title" color="inherit" className="align-middle m-1">
                            EAZY CHART
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={8} className="under-topbar" justify="center" direction="row">
                        <Grid item xs={4}>
                        <aside>
                            <Grid container spacing={16} justify="center">
                                <Grid item container spacing={32} justify="center">
                                    <Grid item>
                                        <ExampleVerticalBarChart onClick={ () => this.props.setVerticalBarChart() }/>
                                    </Grid>
                                    <Grid item>
                                        <ExampleHorizontalBarChart onClick={ () => this.props.setHorizontalBarChart() }/>
                                    </Grid>
                                    <Grid item>
                                        <ExampleAreaChart onClick={ () => this.props.setAreaChart() } />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={32} justify="center">
                                    <Grid item>
                                        <ExampleLineChart onClick={ () => this.props.setLineChart() } />
                                    </Grid>
                                    <Grid item>
                                        <ExampleScatterChart onClick={ () => this.props.setScatterChart() } />
                                    </Grid>
                                    <Grid item>
                                        <ExamplePieChart onClick={ () => this.props.setPieChart() } />
                                    </Grid>
                                </Grid>
                                <Grid item  container spacing={32} justify="center">
                                    <div>
                                        <Paper elevation={8} className="paper m-5">
                                            <VisibleDataSheet/>
                                        </Paper>
                                    </div>
                                </Grid>
                            </Grid>
                        </aside>
                    </Grid>
                    <Grid item xs={8}>
                        <main>
                            <Paper elevation={4} className="paper">
                                <VisibleChart/>
                            </Paper>
                        </main>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Layout;
