import {styled, useTheme} from '@mui/material/styles';


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
    },  
}));

const Dialog = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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


const DialogTitle = styled('h2')(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : '#333',
}));

const DialogContent = styled('div')(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : '#333',
}));



const FooterContainer = styled('footer')(({ theme }) => ({  

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

export  {Button, Dialog, DialogTitle, DialogContent, FooterContainer}