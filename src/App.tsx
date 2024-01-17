import React from "react";
import avatar from "./avatar.jpg";
import "./App.css";
import { Avatar, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/ListItem";

function App() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid>
          <Avatar
            alt="Dylan Choy"
            src={avatar}
            sx={{
              width: 200,
              height: 200,
              alignContent: "center",
            }}
          />
          <code>Hey. I'm Dylan.</code>
          <Grid container>
            <Item>test</Item>
            <Item>dsa</Item>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
