import React from "react";
import Link from "next/link";
import { Nav, PageBody } from "./style";
import { Global, css } from "@emotion/react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  Nav: {
    background: "#0d253f",
    height: "64px",
  },
  text: {
    color: "white",
    marginRight: 20,
    fontWeight: 600,
  },
});

const Layout = ({ children, props }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
          a {
            text-decoration: none;
          }
        `}
      />
      {/* <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/Movies">
          <a>Movies</a>
        </Link>
        <Link href="/Person">
          <a>People</a>
        </Link>
        <Link href="/Tv">
          <a>Tv Shows</a>
        </Link>
      </Nav> */}
      <AppBar className={classes.Nav}>
        <Toolbar>
          <Link href="/">
            <a className={classes.text}>Home </a>
          </Link>
          <Link href="/Movies">
            <a className={classes.text}> Movies </a>
          </Link>
          <Link href="/Person">
            <a className={classes.text}> People </a>
          </Link>
          <Link href="/Tv">
            <a className={classes.text}> Tv Shows </a>
          </Link>
        </Toolbar>
      </AppBar>

      <PageBody>{children}</PageBody>
    </React.Fragment>
  );
};

export default Layout;
