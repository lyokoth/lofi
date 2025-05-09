// At the top of your file, import the required MUI components
import Slider from '@mui/material/Slider';


const StyledSlider = styled(Slider)(({ theme }) => ({
    height: 13,
    maxWidth: 50,
    color: theme.palette.primary.main, // Slider color matches theme primary color
    '& .MuiSlider-thumb': {
      height: 20,
      width: 20,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${
          theme.palette.mode === 'dark'
            ? 'rgb(255 255 255 / 16%)'
            : 'rgb(0 0 0 / 16%)'
        }`,
      },
      '&.Mui-active': {
        height: 24,
        width: 24,
      },
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
  