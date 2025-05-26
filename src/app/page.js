'use client';
import * as React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get Redux state
import styles from './styles/background.module.css';
import Nav from 'src/components/ui/nav';
import MusicSlider from 'src/components/Player/MenuPlayer';
import Timer from 'src/components/pomodoro/pomodoro';
//import SelectTheme from 'src/components/ui/SelectTheme/SelectTheme';
import './globals.css';
 import { useAuth } from 'src/hooks/useAuth';
import Login from '../app/login/page';
import Weather from 'src/components/Weather/Weather';
import FooterPlayer from 'src/components/Player/FooterPlayer';
import Draggable from 'react-draggable';
import SpotifyWidget from 'src/components/SpotifyPlaylist/Spotify';

function Page() {


   // add ability to  add + delete widgets



    return (
        <>
          <Nav />
          <div className="leftSide">
            <Weather />
          <SpotifyWidget />
        </div>
        <div className="main">
          <Timer />
        </div>
        <div className="rightSide">
          <SpotifyWidget />

        </div>
        </>
    );
}

export default Page;
