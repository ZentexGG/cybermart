import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import KeyIcon from "@mui/icons-material/Key";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import HelpIcon from "@mui/icons-material/Help";
import theme from "../../theme";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [touched, setTouched] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setTouched(true);
    console.log(email);
    // TODO Implement fetching to backend
  };
  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(input));
  };

  const handleBlur = () => setTouched(true);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 13,
            borderRadius: 5,
            px: 4,
                      py: 6,
            backgroundColor: theme.palette.secondary.main
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
            <HelpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
            noValidate
          >
            <TextField
              name="email"
              required
              fullWidth
              id="email"
              type="email"
              label="Email"
              onBlur={() => handleBlur()}
              onChange={(e) => validateEmail(e.target.value)}
              error={!validEmail && touched}
              helperText={
                !validEmail && touched
                  ? "Please enter a valid Email Address!"
                  : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 4, mb: 2, backgroundColor: theme.palette.primary.main }}
            >
              Send Email
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
