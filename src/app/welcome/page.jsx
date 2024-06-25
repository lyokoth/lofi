'use client';

import * as React from 'react';
import './welcome.css'; 
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, provider } from 'src/lib/firebase';  // Ensure the correct path to your firebase config
import { Button } from 'src/components/ui/button';  // Ensure the correct path to your Button component
import { Formik } from 'formik';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'next/link';


 function Welcome() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            await updateProfile(user, { displayName: user.displayName });
            toast.success(`Hello, ${user.displayName}`);
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.message);
        }
    };

    const signInWithEmail = async (values) => {
        const { email, username, password, cpass } = values;
        if (password !== cpass) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false);
            toast.success("User created successfully!");
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to lo-fi.</h1>
            <p>Sign up here or sign in with Google</p>
        <ToastContainer>
            <Formik
               className="registration-form"
                initialValues={{ email: '', username: '', password: '', cpass: ''}}
                onSubmit={async (values) => {
                    await signInWithEmail(values);
                }}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit} className="registration-form">
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <input
                            type="username"
                            name="username"
                            placeholder="kenya_megami"
                            value={values.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <input 
                            type="password"
                            name="cpass"
                            placeholder="Confirm Password"
                            value={values.cpass}
                            onChange={handleChange}
                        />
                        <Button className="button" type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Sign in with Email"}
                        </Button>
                    </form>
                )}
            </Formik>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
           
            {error && <p className="error-message">{error}</p>}
            
            </ToastContainer>
         
        </div>
    );
}
export default Welcome;
