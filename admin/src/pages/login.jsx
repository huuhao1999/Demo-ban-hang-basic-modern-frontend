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
import PropTypes from 'prop-types';
import { BoxLoading } from 'react-loadingg';
import api from '../services/api';
import _ from 'lodash';
import { useHistory } from "react-router-dom";

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
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



SignIn.propTypes = {
    onSubmit: PropTypes.func,
};
function SignIn(props) {
    let history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageNotify, setMessageNotify] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let entity = {}
        api.post('/user/login', { username: username, password: password }).then((res) => {
            if (res.status == 200) {
                localStorage.setItem(
                    'account-admin',
                    JSON.stringify(res.data)
                  );
                   alert('Login thanh cong');
            } else alert('Sai password');
        })

    }

    const updateInputValue = async (event) => {
        event.preventDefault();
        if (event.target.name == 'password') setPassword(event.target.value);
        if (event.target.name == 'username') setUsername(event.target.value);
    }



    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {loading === true ? <BoxLoading className='indexcss' /> : ''}
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <span style={{ color: 'red' }}>{messageNotify}</span>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="Username"
                            onChange={evt => updateInputValue(evt)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={evt => updateInputValue(evt)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>

                        </Grid>

                    </form>

                </div>
                <Box mt={8}>

                    <Copyright />

                </Box>
            </Container>
        </div>
    );
}
export default SignIn;