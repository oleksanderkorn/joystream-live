import { Link as RouterLink, Route, Switch } from "react-router-dom";
import { MemoryRouter as Router } from "react-router";
import React from "react";
import ReactDOM from "react-dom";
import LiveStatsWS from "./LiveStatsWS";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import ValidatorReport from "./ValidatorReport";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import joystream from "./joystream.svg";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div style={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ flexDirection: "row", backgroundColor: "#4138ff" }}
        >
          <Toolbar style={{ paddingLeft: "12px", backgroundColor: "#4138ff" }}>
            <Button color="inherit" component={RouterLink} to="/">
              <img
                style={{ width: 50, height: 50 }}
                src={joystream}
                className="App-logo"
                alt="Joystream logo"
              />
            </Button>
            <Button color="inherit" component={RouterLink} to="/">
              Validator Report
            </Button>
            <Button color="inherit" component={RouterLink} to="/live">
              Live Stats
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Switch>
          <Route path="/live">
            <LiveStatsWS />
          </Route>
          <Route path="/">
            {/* <ValidatorReport /> */}
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Typography
                  variant="h2"
                  style={{
                    marginTop: "1rem",
                    color: "#fff",
                    textAlign: "center",
                    backgroundColor: "#4138ff",
                    border: "1px solid #4138ff",
                    borderRadius: 12,
                    padding: 4
                  }}
                >
                  <Link
                    style={{ 
                      color: "#fff",
                      padding: 4
                    }}
                    href="https://joystreamstats.live/validator-report"
                  >
                    Validator Report is now part of Joystream Stats
                  </Link>
                </Typography>
              </Grid>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
