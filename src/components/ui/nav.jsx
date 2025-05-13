'use client';
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import SelectTheme from "./SelectTheme/SelectTheme";
import s from '../../app/styles/navi.module.css';
import { TinyText } from "./UiComponents";
import cn from 'clsx';
import Link from "next/link";
import ThemeIcon from "../icons/ThemeIcon";
import styles from '../../app/styles/nav.module.css';

const Nav = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const date = new Date();
    const day = date.toLocaleString('default', { weekday: 'long' , month: 'long', day: 'numeric' });
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            setTime(date.toLocaleTimeString())
    }, 1000);
}, []);

    const toggleDropdown = () => {
        setDropdown((prev) => !prev);
    };

    function get24HourTime(time) {
        const [hours, minutes] = time.split(':');
        const hours24 = (parseInt(hours) % 12) + (time.includes('PM') ? 12 : 0);
        return `${hours24.toString().padStart(2, '0')}:${minutes}`; 
    }   
    
    const handleTimeSwitch = () => {
        if (time.includes('AM') || time.includes('PM')) {
            setTime(get24HourTime(time));
        } else {
            setTime(new Date().toLocaleTimeString());
        }
    };
    const handleClickOutside = (event) => {
        if (dropdown && !event.target.closest(`.${s.theme_btn}`)) {
            setDropdown(false);
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdown]);


    return (
        <nav className="nav">
            <ul className={cn(s.root)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <li>
                    <Link href="/">
                        <h1>lo-fi companion</h1>
                    </Link>
                </li>
                <li>
                    <div className={styles.timer}>
                        <span>{day}</span>
                        <br />
                        <span>{time}</span>
                        <br />
                        <Button onClick={handleTimeSwitch} className={styles.time_btn}>
                            {time.includes('AM') || time.includes('PM') ? 'Switch to 24h' : 'Switch to 12h'}
                        </Button>
                    </div>
                </li>
                <li>
                    <div className={cn(s.theme_btn)}>
                        <button
                            className={cn(s.theme_btn_trigger)}
                            onClick={toggleDropdown}
                            aria-expanded={dropdown}
                            aria-controls="theme-dropdown"
                        >
                            <ThemeIcon />
                            <span className={cn(s.theme_btn_txt)}>Change Theme</span>
                        </button>
                        {dropdown && (
                            <div
                                id="theme-dropdown"
                                className={cn(s.theme_dropdown)}
                                role="menu"
                                onClick={(e) => e.stopPropagation()} // Prevent click propagation
                            >
                                <SelectTheme />
                            </div>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
