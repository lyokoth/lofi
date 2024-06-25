'use client'
import React, { useEffect, useState} from "react";
import { Button } from "./button";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import SelectTheme from "./SelectTheme/SelectTheme";
import s from '../../app/styles/navi.module.css';

import cn from 'clsx';
import Link from "next/link";
import { CaretDownIcon } from "@radix-ui/react-icons";
import styles from '../../app/styles/nav.module.css';
import ThemeIcon from "../icons/ThemeIcon";
import BackgroundSelect from "./SelectBackground/BackgroundSelect";
import { Navigation } from "@mui/icons-material";

const Nav = () => {
    const [time, setTime] = useState();
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    useEffect(() => {
      setInterval(() => {
        const date = new Date();
        setTime(date.toLocaleTimeString())
      }, 1000)
    }, []); 


    return (
        <NavigationMenu.Root className={cn(s.root)}>
            <NavigationMenu.List className={cn(s.root)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               
                <NavigationMenu.Item>
                    <Link href="/">
                        <p className={styles.logo}>lo-fi companion </p>
                    </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                <div className={styles.timer}><span>{currentTime}</span></div>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className={cn(s.theme_btn)}>
                        <ThemeIcon />
                        <span className={cn(s.theme_btn_txt)}>Change Theme</span>
                        <CaretDownIcon className={cn(s.theme_btn_icon)} />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className={cn(s.theme_dropdown)}>
                        <SelectTheme />
                    </NavigationMenu.Content>
                
                </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Viewport />
        </NavigationMenu.Root>
    );
}
export default Nav;