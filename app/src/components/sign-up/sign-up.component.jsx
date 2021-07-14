import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../context/auth.context';
import { BoxLoading } from 'react-loadingg';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Courses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [fullname, setFullname] = useState('');
  const [otpServer, setOtpServer] = useState('');
  const [submitOTP, setSubmitOTP] = useState(false);
  const [submitNEW, setSubmitNEW] = useState(false);
  const [isShowOtp, setIsShowOtp] = useState(false);
  const context = useAuth();
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitNEW(true)
    setLoading(true);
    event.preventDefault();
    if (password != repassword) {
      alert("Password not equal!");
      setLoading(false);
      return;
    }

    let entity = {
      username: email,
      password: password,
    
    }
    context
      .signUp(entity)
      .catch((error) => {
        console.log(error);
        setLoading(false);
        return;
      })
      .then((res) => {
        alert('Đăng kí thành công')
        setLoading(false);
      });
  }

  const updateInputValue = async (event) => {

    if (event.target.name == 'repassword') setRepassword(event.target.value);
    if (event.target.name == 'password') setPassword(event.target.value);
    if (event.target.name == 'email') setEmail(event.target.value);
    if (event.target.name == 'address') setAddress(event.target.value);
    if (event.target.name == 'phone') setPhone(event.target.value);
    if (event.target.name == 'full_name') setFullname(event.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading === true ? <BoxLoading /> : ''}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>


          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="full_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="full_name"
                  label="Full name"
                  autoFocus
                  onChange={evt => updateInputValue(evt)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  onChange={evt => updateInputValue(evt)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={evt => updateInputValue(evt)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repassword"
                  label="Repeat password"
                  type="password"
                  id="repassword"
                  autoComplete="current-password"
                  onChange={evt => updateInputValue(evt)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  onChange={evt => updateInputValue(evt)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="phone"
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  type="number"
                  autoFocus
                  onChange={evt => updateInputValue(evt)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
           
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
