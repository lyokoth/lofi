'use client'
import React, {useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import './login.css';
import { Formik } from 'formik';
import { Button } from 'src/components/ui/button';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { auth, provider } from 'src/lib/firebase';
const Login = () => {
    const [email, setEmail] = useState('');
   
    const [password, setPassword] = useState('');
   
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
    return (
        <div className="login-container">
            <h1>Log in to lo-fi.</h1>
            <ToastContainer />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    signInWithEmail(values);
                }}
            >
                {({ handleChange, values }) => (
                    <form>
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
                        <Button type="submit">Log in</Button>
                    </form>
                )}
            </Formik>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          
                <Link href="/welcome">
                    <span>Sign up</span>
                </Link>
           
        </div>
    );
}
export default Login;
// Compare this snippet from src/app/pages/Welcome/page.jsx: