import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import BaseUrl from "../../api/BaseURL";

const theme = createTheme();

export default function SignIn({ login, nameUser }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [account, setAccount] = useState([]);

  const handleSubmit = (event, e) => {
    event.preventDefault();
    account.forEach((item) => {
      if (item.userName === user.email && item.password === user.password) {
        login(1);
        nameUser(item.idAdmin, item.userName, item.password);
      }
    });
  };

  const handleChange = (e) => {
    let newData = { ...user };
    newData[e.target.id] = e.target.value;
    setUser(newData);
    setErrors({ ...errors, [e.target.id]: "" });
  };
  useEffect(() => {
    fetch(BaseUrl.baseUrl + `/Admin`)
      .then((response) => response.json())
      .then((value) => setAccount(value));
  }, []);

  console.log(account);

  const handleErrors = (e) => {
    if (e.target.value === "" && [e.target.id] == "email") {
      setErrors({ ...errors, email: "Please enter your User Name !!!" });
    }
    if (e.target.value === "" && [e.target.id] == "password") {
      setErrors({ ...errors, password: "Please enter your Password !!!" });
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url("https://thumbs.dreamstime.com/z/people-watching-movie-cinema-audience-cartoon-person-sitting-back-man-woman-theater-empty-screen-crowd-rear-vector-195693714.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}></Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ textTransform: "uppercase" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => handleErrors(e)}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={(e) => handleErrors(e)}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
