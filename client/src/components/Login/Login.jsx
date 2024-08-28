import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link, Box, Paper, Avatar } from '@mui/material';
import { loginUser } from '../../axios'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() && password.trim()) {
            try {
                const data = await loginUser(email, password);
                if (!data.err) {
                    dispatch({ type: 'refresh' });
                    navigate('/');
                } else {
                    setErr(data.message);
                }
            } catch (error) {
                console.error(error);
                setErr(error.response.data.message || error.response.data.errors[0].msg);
            }
        } else {
            setErr('All fields are required');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            {err && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                    {err}
                </Typography>
            )}
            <Paper elevation={6} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
