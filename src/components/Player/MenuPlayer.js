import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { CloseTwoTone, ExpandMoreTwoTone,  FastRewindRounded,  QueueMusic, PlayArrowRounded, PauseRounded } from '@mui/icons-material';
import MoodSelection from './MoodSelection';
import { loFi, hipHop, afrobeats, rnb } from 'src/data/songData'; // Import your song data as needed
import ReactCardFlip from 'react-card-flip';
import YouTubePlayer from 'src/components/Player/YouTubePlayer';


const Widget = styled('div')(({ theme }) => ({
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
  boxShadow: theme.shadows[3],
  perspective: 1000,
}));

const FrontFace = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
});

const BackFace = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
});

const FlipWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  '&.flipped': {
    transform: 'rotateY(180deg)',
  },
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
  const [minimized, setMinimized ] = useState(false);

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
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(40px)',
            boxShadow: theme.shadows[3],
        }}>
        <Widget>
        <MoodSelection selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
          </Widget>
          <button style={{
                    width: '150px',
                    padding: '10px',
                    fontSize: '20px',
                    background: '#f5d9fa',
                    fontWeight: 'bold',
                    borderRadius: '5px'
                }} 
                onClick={() => setFlipped(!flipped)}>
                    Flip</button>
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
          <button style={{
                    width: '150px',
                    padding: '10px',
                    fontSize: '20px',
                    background: '#f5d9fa',
                    fontWeight: 'bold',
                    borderRadius: '5px'
                }} onClick={() => setFlipped(!flipped)}>
                    Flip</button>
            </div>
      </ReactCardFlip>
   
      </Box>
  );
}
