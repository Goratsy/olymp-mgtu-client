import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import bgNavbar from '../../assets/bgNavbar.jpg';
import iconMgtu from '../../assets/iconMgtu.png'
import { makeStyles } from '@mui/styles';
import { Box, Link } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';

const useStyles = makeStyles((theme) => ({
  navbarStyle: {
    backgroundImage: `url(${bgNavbar})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', 
    borderRadius: "20px",
    color: 'white',


  },
}));


export default function Navbar() {
  const classes = useStyles();

  return (
      <Box position="static" className={classes.navbarStyle}>
        <Toolbar sx={{
          px: '32px',
          py: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          
          <Link href="https://olymp.bmstu.ru/ru" target='_blank'>
            <img src={iconMgtu} alt="logoMgtu" />
          </Link>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5vw'
          }}>
            <TranslateOutlinedIcon sx={{fontSize: 48}}></TranslateOutlinedIcon>
            <SearchOutlinedIcon sx={{fontSize: 48}}></SearchOutlinedIcon>
            <DarkModeOutlinedIcon sx={{fontSize: 48}}></DarkModeOutlinedIcon>
            <AccountCircleOutlinedIcon sx={{fontSize: 48}}></AccountCircleOutlinedIcon>
          </Box>
          
        </Toolbar>
      </Box>
  );
}