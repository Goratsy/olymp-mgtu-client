import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import bgNavbar from '../../assets/bgNavbar.jpg';
import iconMgtu from '../../assets/iconMgtu.png'
import { Box, Link } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { useTheme } from '@emotion/react';




export default function Navbar() {
  const theme = useTheme();
  
  const navbarStyle = {
    backgroundImage: `url(${bgNavbar})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', 
    borderRadius: "20px",
    color: theme.palette.white.light,
    mb: '12px'
  };
  const toolBarStyle = {
    px: '32px',
    py: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  const groupIconsStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5vw'
  };
  const iconStyle = {
    fontSize: 48,
    color: theme.palette.grey.light,
    ':hover': {color: '#ffffff'},
    cursor: 'pointer',
    transition: '200ms ease'
  };
  let accountIconStyle = {
    fontSize: 48,
    color: '#fff',
    ':hover': {color: theme.palette.grey.light},
    cursor: 'pointer',
    transition: '200ms ease'
  }
  
  return (
      <Box position="static" sx={navbarStyle}>
        <Toolbar sx={toolBarStyle}>
          <Link href="https://olymp.bmstu.ru/ru" target='_blank'>
            <img src={iconMgtu} alt="logoMgtu" />
          </Link>
          <Box sx={groupIconsStyle}>
            <TranslateOutlinedIcon sx={iconStyle}></TranslateOutlinedIcon>
            <SearchOutlinedIcon sx={iconStyle}></SearchOutlinedIcon>
            <DarkModeOutlinedIcon sx={iconStyle}></DarkModeOutlinedIcon>
            <AccountCircleOutlinedIcon sx={accountIconStyle}></AccountCircleOutlinedIcon>
          </Box>
        </Toolbar>
      </Box>
  );
}