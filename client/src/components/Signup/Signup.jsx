import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Avatar, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signupUser } from '../../axios'; 

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && email.trim() && password.trim()) {
            try {
                const data = await signupUser(name, email, password);
                if (!data.err) {
                    dispatch({ type: 'refresh' });
                    navigate('/');
                } else {
                    setErr(data.errors ? data.errors.map(error => error.msg).join(', ') : data.message);
                }
            } catch (error) {
                setErr(error.response.data.message || error.response.data.errors[0].msg);
            }
        } else {
            setErr('All fields are required');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                {err && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {err}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Username"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login" sx={{ textDecoration: 'none', color: 'primary.main' }}>
                            Log in
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default Signup;
