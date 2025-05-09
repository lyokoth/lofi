import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, Typography, Stack, Slider, Dialog } from '@mui/material';
import { QueueMusicRounded, ExpandMoreRounded, VolumeUpRounded, VolumeDownRounded } from '@mui/icons-material';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { loFi, hipHop, afrobeats, rnb, jazz } from '../../data/songData';
import { Icon } from '@iconify/react';

const MoodWidget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backdropFilter: 'blur(40px)',
}));

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const StyledSlider = styled(Slider)(({ theme }) => ({
    height: 13,
    maxWidth: 50,
    backgroundColor: theme.palette.background.default,
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        borderRadius: '50%',
        backgroundColor: 'var(--background-primary)',
    },
    '& .MuiSlider-track': {
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiSlider-rail': {
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.divider,
    },
}));

const formatDuration = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

function MoodSelection() {
    const [selectedMood, setSelectedMood] = useState('lofi');
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState(loFi);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        let playlist;
        switch (selectedMood) {
            case 'hiphop': playlist = hipHop; break;
            case 'afrobeats': playlist = afrobeats; break;
            case 'rnb': playlist = rnb; break;
            case 'jazz': playlist = jazz; break;
            case 'lofi': 
            default: playlist = loFi; break;
        }
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);
        setOpenDialog(false);
    }, [selectedMood]);

    useEffect(() => {
        if (audio) {
            audio.pause();
            audio.removeEventListener('timeupdate', updatePosition);
            audio.removeEventListener('ended', handleNextSong);
        }

        const newAudio = new Audio(currentPlaylist[currentSongIndex].src);
        newAudio.addEventListener('timeupdate', updatePosition);
        newAudio.addEventListener('ended', handleNextSong);

        setAudio(newAudio);
        setPosition(0);
        if (isPlaying) newAudio.play();

        return () => {
            newAudio.pause();
            newAudio.removeEventListener('timeupdate', updatePosition);
            newAudio.removeEventListener('ended', handleNextSong);
        };
    }, [currentPlaylist, currentSongIndex]);

    const updatePosition = () => {
        setPosition(audio?.currentTime || 0);
    };

    const handlePlayPause = () => {
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % currentPlaylist.length);
    };

    const handlePrevSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + currentPlaylist.length) % currentPlaylist.length);
    };

    return (
        <MoodWidget>
            <IconButton onClick={() => setOpenDialog(!openDialog)}>
                <QueueMusicRounded /> <ExpandMoreRounded />
            </IconButton>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <h1 className="text-2xl font-bold">Select your mood</h1>
                <RadioGroup.Root
                    className="flex items-center justify-center space-x-4"
                    value={selectedMood}
                    onValueChange={setSelectedMood}
                >
                    {['lofi', 'hiphop', 'afrobeats', 'rnb', 'jazz'].map((mood) => (
                        <RadioGroup.Item key={mood} value={mood} className="flex items-center">
                            <RadioGroup.Indicator className="mr-2" />
                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </RadioGroup.Item>
                    ))}
                </RadioGroup.Root>
            </Dialog>

            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography variant="caption" color="textSecondary">
                    {currentPlaylist[currentSongIndex]?.author}
                </Typography>
                <Typography noWrap>
                    {currentPlaylist[currentSongIndex]?.name}
                </Typography>
            </Box>

            <Slider
                min={0}
                max={audio?.duration || 1}
                value={position}
                onChange={(_, value) => {
                    setPosition(value);
                    if (audio) audio.currentTime = value;
                }}
                sx={{ width: '100%', color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)' }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <IconButton onClick={handlePrevSong}>
                    <Icon icon="fluent:rewind-20-regular" style={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton onClick={handlePlayPause}>
                    <Icon icon={isPlaying ? 'akar-icons:pause' : 'akar-icons:play'} style={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton onClick={handleNextSong}>
                    <Icon icon="fluent:next-32-regular" style={{ fontSize: '2rem' }} />
                </IconButton>
            </Box>

            <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
                <VolumeDownRounded />
                <StyledSlider defaultValue={30} min={0} max={100} />
                <VolumeUpRounded />
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <TinyText>{formatDuration(position)}</TinyText>
                <TinyText>{formatDuration((audio?.duration || 0) - position)}</TinyText>
            </Box>
        </MoodWidget>
    );
}

export default MoodSelection;
