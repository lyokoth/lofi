import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import {Icon } from '@iconify/react'
import MoodSelection from './MoodSelection';
import { loFi, hipHop, afrobeats, rnb } from 'src/data/songData'; // Import your song data as needed
import ReactCardFlip from 'react-card-flip';
import YouTubePlayer from 'src/components/Player/YouTubePlayer';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 450,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'var(--background-primary)',
  color: 'var(--text-base)',
  backdropFilter: 'blur(40px)',
  boxShadow: theme.shadows[3],
  perspective: 1000,
}));

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});


export default function MusicSlider() {
  const theme = useTheme();
  const [flipped, setFlipped] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const [selectedMood, setSelectedMood] = useState('lofi');
  const currentPlaylist = loFi; // Set your default playlist here
 

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    
    <Box sx={{ width: '100%', overflow: 'hidden' }}>

      <ReactCardFlip isFlipped={flipped}
      flipDirection="horizontal">
        <div style={{
          width: 343,
          maxWidth: '100%',
          margin: '20px',
          padding: '20px',
          brorderRadius: '20px',
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(40px)',
            boxShadow: theme.shadows[3],
        }}>
        <Widget>
        <IconButton aria-label="flip"  onClick={() => setFlipped(!flipped)}>
            <Icon icon="material-symbols:flip-camera-android-rounded" style={{ fontSize: '2rem', color: 'var(--background-primary)' }} />
            </IconButton>
        <MoodSelection selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
          </Widget>
          <IconButton aria-label="flip"  onClick={() => setFlipped(!flipped)}>
            <Icon icon="material-symbols:flip-camera-android-rounded" style={{ fontSize: '2rem', color: 'var(--background-primary)' }} />
            </IconButton>
            </div>
            <div style={{
          width: 343,
          maxWidth: '100%',
          margin: '20px',
          padding: '20px',
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(40px)',
            boxShadow: theme.shadows[3],
        }}>
          <YouTubePlayer />
          
            </div>
      </ReactCardFlip>
   
      </Box>
  );
}
