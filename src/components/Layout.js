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
import UniversalChartButton from "./exampleCharts/UniversalChartButton";
import Paper from "@material-ui/core/Paper/Paper";
import Button from '@material-ui/core/Button/Button';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "../styles.css";


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
                                <li className="nav-item active m-1">
                                    <Button variant="contained" component="span" color="default"
                                        href="http://nonsensopedia.wikia.com/wiki/Gra:Gra"
                                    >
                                        Pomoc<span className="sr-only">(current)</span>
                                    </Button>
                                </li>
                            </ul>
                        </Typography>
                        <div className="w-50">
                        </div>
                        <Typography variant="title" color="inherit" className="float-xl-right m-1">
                            EAZY CHART
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={2} className="under-topbar" justify="center" direction="row" alignItems='stretch'>
                        <Grid item xs={5} alignItems={"center"}>
                        <aside className="w-100" >
                            <Grid container spacing={32} justify="center" >
                                <Grid item container spacing={40} justify="center" alignItems={"center"}>
                                    <Grid item className="m-auto">
                                        <UniversalChartButton name={"WYKRES KOLUMNOWY"} onClick={ () => this.props.setVerticalBarChart() }/>
                                    </Grid>
                                    <Grid item  className="m-auto">
                                        <UniversalChartButton name={"WYKRES SŁUPKOWY"} onClick={ () => this.props.setHorizontalBarChart() }/>
                                    </Grid>

                                </Grid>
                                <Grid item container spacing={40} justify="center" alignItems={"center"}>
                                    <Grid item className="m-auto">
                                        <UniversalChartButton name={"WYKRES LINIOWY"} onClick={ () => this.props.setLineChart() } />
                                    </Grid>
                                    <Grid item className="m-auto">
                                        <UniversalChartButton name={"WYKRES PUNKTOWY"} onClick={ () => this.props.setScatterChart() } />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={40} justify="center">
                                    <Grid item className="m-auto">
                                        <UniversalChartButton name={"WYKRES PÓL"} onClick={ () => this.props.setAreaChart() } />
                                    </Grid>
                                    <Grid item className="m-auto">
                                        <UniversalChartButton name={"WYKRES KOŁOWY"} onClick={ () => this.props.setPieChart() } />
                                    </Grid>
                                </Grid>
                                <Grid item  container spacing={32} justify="center">
                                    <div className="bg-light w-75 overflow-auto mt-5 Content">
                                        <Paper elevation={8} className="paper m-3">
                                            <div className="pre-scrollable" width="20%">
                                                <VisibleDataSheet/>
                                            </div>
                                        </Paper>
                                    </div>
                                </Grid>
                            </Grid>
                        </aside>
                    </Grid>
                    <Grid item xs={7} className="HighChart">
                        <main >
                            <Paper elevation={4} className="paper h-auto "  >
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
