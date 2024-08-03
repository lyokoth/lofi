'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { loFi, hipHop, afrobeats, rnb, jazz } from '../../data/songData';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import { PlayArrowRounded, PauseRounded, FastForwardRounded, FastRewindRounded, VolumeUpRounded, VolumeDownRounded, QueueMusicRounded, ExpandMoreRounded, ExpandLessRounded } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import './MoodSelection.css';
import s from './MoodSelection.module.css';

const MoodWidget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const formatDuration = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

function MoodSelection() {
    const [selectedMood, setSelectedMood] = useState('lofi');
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState(loFi);
    const [audio, setAudio] = useState(new Audio(currentPlaylist[currentSongIndex].src));
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [showMoodSelector, setShowMoodSelector] = useState(true); // State to control visibility
    const theme = useTheme();

    useEffect(() => {
        let playlist;
        switch (selectedMood) {
            case 'hiphop':
                playlist = hipHop;
                break;
            case 'afrobeats':
                playlist = afrobeats;
                break;
            case 'rnb':
                playlist = rnb;
                break;
            case 'jazz':
                playlist = jazz;
                break;
            case 'lofi':
            default:
                playlist = loFi;
                break;
        }
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);
    }, [selectedMood]);

    useEffect(() => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(currentPlaylist[currentSongIndex].src);
        setAudio(newAudio);
        setPosition(0);
        if (isPlaying) {
            newAudio.play();
        }
    }, [currentPlaylist, currentSongIndex]);

    useEffect(() => {
        if (audio) {
            const updatePosition = () => setPosition(audio.currentTime);
            audio.addEventListener('timeupdate', updatePosition);
            audio.addEventListener('ended', () => handleSongChange(true));

            return () => {
                audio.removeEventListener('timeupdate', updatePosition);
                audio.removeEventListener('ended', () => handleSongChange(true));
            };
        }
    }, [audio]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSongChange = (forward = true) => {
        let newIndex;
        if (forward) {
            newIndex = (currentSongIndex + 1) % currentPlaylist.length;
        } else {
            newIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        }
        setCurrentSongIndex(newIndex);
    };

    return (
        <MoodWidget>
            <IconButton aria-label="toggle mood selector" onClick={() => setShowMoodSelector(!showMoodSelector)}>
                <QueueMusicRounded/> 
                <ExpandMoreRounded /> 
            </IconButton>
            {showMoodSelector && (
                <>
                    <h1 className="text-2xl font-bold">Select your mood</h1>
                    <RadioGroup.Root
                        className="flex items-center justify-center space-x-4"
                        value={selectedMood}
                        onValueChange={(value) => setSelectedMood(value)}
                    >
                        <RadioGroup.Item id="lofi" value="lofi" className="flex items-center">
                            <RadioGroup.Indicator className="mr-2" />
                            Lofi
                        </RadioGroup.Item>
                        <RadioGroup.Item id="hiphop" value="hiphop" className="flex items-center">
                            <RadioGroup.Indicator className="mr-2" />
                            HipHop
                        </RadioGroup.Item>
                        <RadioGroup.Item id="afrobeats" value="afrobeats" className="flex items-center">
                            <RadioGroup.Indicator className="mr-2" />
                            Afrobeats
                        </RadioGroup.Item>
                        <RadioGroup.Item id="rnb" value="rnb" className="flex items-center">
                            <RadioGroup.Indicator className="mr-2" />
                            RnB
                        </RadioGroup.Item>
                    </RadioGroup.Root>
                </>
            )}
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography variant="caption" color="textSecondary">
                    {currentPlaylist[currentSongIndex].author}
                </Typography>
                <Typography noWrap>
                    {currentPlaylist[currentSongIndex].name}
                </Typography>
            </Box>
            <Slider 
            aria-label="time-inidicator"
            size="small"
            value={position}
            max={audio.duration}
            onChange={(_, value) => setPosition(value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <IconButton aria-label="previous song" onClick={() => handleSongChange(false)}>
                    <FastRewindRounded sx={{ fontSize: '3rem' }} />
                </IconButton>
                <IconButton aria-label={isPlaying ? 'pause' : 'play'} onClick={handlePlayPause}>
                    {isPlaying ? <PauseRounded sx={{ fontSize: '3rem' }} /> : <PlayArrowRounded sx={{ fontSize: '3rem' }} />}
                </IconButton>
                <IconButton aria-label="next song" onClick={() => handleSongChange(true)}>
                    <FastForwardRounded sx={{ fontSize: '3rem' }} />
                </IconButton>
            </Box>
            <Stack spacing={2} direction="row" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <VolumeDownRounded />
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
                <VolumeUpRounded />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -2 }}>
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>{formatDuration(audio.duration - position)}</TinyText>
                </Box>
            </Stack>
        </MoodWidget>
    );
}
export default MoodSelection;