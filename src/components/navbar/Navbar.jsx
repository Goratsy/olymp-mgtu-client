import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import bgNavbar from '../../assets/bgNavbar.jpg';
import iconMgtu from '../../assets/iconMgtu.png'
import { makeStyles } from '@mui/styles';
import { Box, Link } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const useStyles = makeStyles((theme) => ({
  navbarStyle: {
    backgroundImage: `url(${bgNavbar})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', 
    color: 'white',
    borderRadius: "20px",
  },
}));


export default function Navbar() {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.navbarStyle}>
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
            <LanguageOutlinedIcon sx={{fontSize: 48}}></LanguageOutlinedIcon>
            <SearchOutlinedIcon sx={{fontSize: 48}}></SearchOutlinedIcon>
            <DarkModeOutlinedIcon sx={{fontSize: 48}}></DarkModeOutlinedIcon>
            <AccountCircleOutlinedIcon sx={{fontSize: 48}}></AccountCircleOutlinedIcon>
          </Box>
          
        </Toolbar>
      </AppBar>
  );
}