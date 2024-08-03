'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles/background.module.css';
import Nav from 'src/components/ui/nav';
import MusicSlider from 'src/components/Player/MenuPlayer';
import TaskManager from 'src/components/TaskList/TaskList';
import Timer from 'src/components/pomodoro/pomodoro';
import Welcome from '../app/welcome/page';
import './globals.css';
import { useAuth } from 'src/hooks/useAuth';  // Ensure correct path to your custom hook
import Login from '../app/login/page';

function Page() {
    const { user } = useAuth();
 
    if (!user) {
        return <Login />;
    }


    


    return (
        <div className={styles.background}>
            <Nav />
            <div className={styles.leftSide}>
                <Timer />
                <MusicSlider />
            </div>
            <div className={styles.main}>
                <TaskManager />
            </div>
        </div>
    );
}

export default Page;
