import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import './login.css';
import { Formik } from 'formik';
import { Button } from 'src/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, provider } from 'src/lib/firebase';
import { styled, useTheme } from '@mui/material/styles';

const LoginContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const Login = () => {
    const router = useRouter();

    const signInWithEmail = async (values) => {
        const { email, password } = values;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/app');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            toast.success(`Hello, ${user.displayName}`);
            router.push('/home');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const loginWithSpotfiy = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            toast.success(`Hello, ${user.displayName}`);
            router.push('/home');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <LoginContainer>
                <h1>Log in to lo-fi.</h1>
                <ToastContainer />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await signInWithEmail(values);
                        setSubmitting(false);
                    }}
                >
                    {({ handleChange, values, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <Button type="submit" disabled={isSubmitting}>
                                Log in
                            </Button>
                        </form>
                    )}
                </Formik>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Link href="/welcome">
                    <span>Sign up</span>
                </Link>
                <Button onClick={loginWithSpotfiy}>Sign in with Spotify</Button>
            </LoginContainer>
        </>
    );
}

export default Login;
