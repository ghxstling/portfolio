import React from "react";
import avatar from "./avatar.jpg";
import "./App.css";

import {
  Avatar,
  Box,
  Container,
  Link,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/ListItem";

import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const theme = createTheme();

function Header() {
  return (
    <>
      <Grid>
        <Avatar
          alt="Dylan Choy"
          src={avatar}
          sx={{
            width: 200,
            height: 200,
          }}
        />
      </Grid>
      <Grid>
        <code>Hey, I'm Dylan.</code>
      </Grid>
    </>
  );
}

function Footer() {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Stack direction="row" spacing={3}>
            <Link href="https://www.instagram.com/doodlyn_/" color="inherit">
              <InstagramIcon fontSize="medium" />
            </Link>
            <Link href="https://github.com/ghxstling" color="inherit">
              <GitHubIcon fontSize="medium" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/dylan-choy/"
              color="inherit"
            >
              <LinkedInIcon fontSize="medium" />
            </Link>
          </Stack>
        </Grid>
        <Grid>
          <Typography variant="body2" color="white">
            {"Copyright © Dylan Choy "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Header />
          <Grid>
            {/* showcase projects here */}
            {/* <Stack direction="row" spacing={3}>
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Stack> */}
          </Grid>
          <Box
            sx={{
              padding: "1rem",
              position: "fixed",
              bottom: 0,
            }}
            component="footer"
          >
            <Footer />
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
