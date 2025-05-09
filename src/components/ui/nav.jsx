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
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
            setDate(now.toLocaleDateString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleDropdown = () => {
        setDropdown((prev) => !prev);
    };

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
                        <span>{time}</span>
                        <span>{date}</span>
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
