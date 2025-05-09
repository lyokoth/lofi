'use client';

import React, { useState, useEffect } from 'react';
import {
    Box, Typography, IconButton, Dialog, Slider,
     styled, useTheme
} from '@mui/material';
import ReactPlayer from 'react-player';
import Button from '@mui/material/Button';
import { tokyo, lofiGirl, videoGame, jazz, krnb } from 'src/data/youtubePlaylistData';
import { 
    CloseTwoTone, ExpandMoreTwoTone,  ExpandLessTwoTone,
    FastRewindRounded, PlayCircle, PauseCircle,
    FastForwardRounded, PlaylistPlay
} from '@mui/icons-material';

import styles from './lofi.module.css';

const Widget = styled('div')(({ theme }) => ({
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

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const VideoPlayerWidget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 200,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));


const formatDuration = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const YouTubePlayer = () => {
    const [play, setPlay] = useState(false);
    const [playlist, setPlaylist] = useState(tokyo);
    const [currentPlaylist, setCurrentPlaylist] = useState(tokyo[0]);
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [minimize, setMinimize] = useState(false);

    const theme = useTheme();

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const togglePlay = () => {
        setPlay(!play);
    };

    const nextSong = () => {
        if (currentPlaylistIndex === playlist.length - 1) {
            setCurrentPlaylistIndex(0);
        } else {
            setCurrentPlaylistIndex(currentPlaylistIndex + 1);
        }
        setCurrentPlaylist(playlist[currentPlaylistIndex]);
    };

    const previousSong = () => {
        if (currentPlaylistIndex === 0) {
            setCurrentPlaylistIndex(playlist.length - 1);
        } else {
            setCurrentPlaylistIndex(currentPlaylistIndex - 1);
        }
        setCurrentPlaylist(playlist[currentPlaylistIndex]);
    };

    useEffect(() => {
        setCurrentPlaylist(playlist[0]);
        setCurrentPlaylistIndex(0);
    }, [playlist]);

    const selectPlaylist = (playlistName) => {
        switch (playlistName) {
            case 'tokyo':
                setPlaylist(tokyo);
                break;
            case 'lofiGirl':
                setPlaylist(lofiGirl);
                break;
            case 'videoGame':
                setPlaylist(videoGame);
                break;
            case'jazz':
                setPlaylist(jazz);
                break;
            case 'hiphop':
                setPlaylist(hiphop);
                break;
            case 'krnb':
                setPlaylist(krnb);
                break; 
            default:
                setPlaylist(tokyo);
        }
        handleCloseDialog();
    };

    return (
        <Widget className={styles.player}>
            <IconButton onClick={() => setMinimize(!minimize)}>
                {minimize ? <ExpandMoreTwoTone /> : <CloseTwoTone />}
            </IconButton>
           <h1>YouTube Radio</h1>
            <p className={styles.title}>{currentPlaylist.title}</p>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <Widget>
                    <Typography variant="h4" gutterBottom>
                        Select a playlist
                    </Typography>
                    <div className="playlist-selector">
                    <Button onClick={() => selectPlaylist('tokyo')} variant="contained">
                        Tokyo
                    </Button>
                    <Button onClick={() => selectPlaylist('lofiGirl')} variant="contained">
                        Lofi Girl
                    </Button>
                    <Button onClick={() => selectPlaylist('videoGame')} variant="contained">
                        Video Game
                    </Button>
                    <Button onClick={() => selectPlaylist('jazz')} variant="contained">
                        Jazz
                    </Button>
                    <Button onClick={() => selectPlaylist('hipHop')} variant="contained">
                       Hip Hop 
                       </Button>
                    <Button onClick={() => selectPlaylist('krnb')} variant="contained">
                       K-RnB 
                       </Button>
                    </div>
                </Widget>
            </Dialog>
            <IconButton onClick={handleOpenDialog}>
                <PlaylistPlay />
            </IconButton>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                
                <IconButton onClick={previousSong}>
                    <FastRewindRounded />
                </IconButton>
                <IconButton onClick={togglePlay}>
                    {play ? <PauseCircle /> : <PlayCircle />}
                </IconButton>
                <IconButton onClick={nextSong}>
                    <FastForwardRounded />
                </IconButton>
                <Slider
                    aria-label="Volume"
                    defaultValue={30}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        '& .MuiSlider-track': {
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            backgroundColor: 'currentColor',
                            '&::before': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                boxShadow: 'none',
                            },
                        },
                    }}
                />
            </Box>
            
    
            <ReactPlayer
                url={currentPlaylist.url}
                playing={play}
                volume={0.3}
                width="50%"
                height="50%"
                className={styles.player}
                controls={false}
                loop={true}
            />
           
   
        {minimize && (

            <VideoPlayerWidget>
                <h1>Now Playing: {currentPlaylist.title}</h1>
              <IconButton onClick={setMinimize}>
                {minimize ? <ExpandLessTwoTone /> : <CloseTwoTone />}
                </IconButton>
                <IconButton onClick={previousSong}>
                    <FastRewindRounded />
                </IconButton>
                <IconButton onClick={togglePlay}>
                    {play ? <PauseCircle /> : <PlayCircle />}
                </IconButton>
                <IconButton onClick={nextSong}>
                    <FastForwardRounded />
                </IconButton>
                <TinyText>{formatDuration(currentPlaylist.duration)}</TinyText>
                

                <ReactPlayer
                    url={currentPlaylist.url}
                    playing={play}
                    volume={0.3}
                    width="0px"
                    height="0px"
                    className={styles.player}
                    controls={false}
                    loop={true}
                />
            </VideoPlayerWidget>
        )}
        </Widget>   
    );
}

export default YouTubePlayer;
