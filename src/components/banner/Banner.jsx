import { Box, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import bgBanner from '../../assets/bgBanner.jpg';
import ButtonContained from '../buttonContained/buttonContained';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import './Banner.css';
import { useTheme } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
    bannerStyle: {
      backgroundImage: `url(${bgBanner})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center', 
      borderRadius: "24px"
},
}));

function Banner() {
    const classes = useStyles();
    const theme = useTheme();
    const colorMainText = theme.palette.primary.violet_main;


    return (
        <Box className={classes.bannerStyle} sx={{
            p: '56px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <Typography sx={{color: colorMainText, fontWeight: 'normal'}}>Подготовка к олимпиаде</Typography>

            <Box>
                <Typography variant='h1' style={{fontFamily: 'Pobeda'}} sx={{fontWeight:'bold', fontSize: '80px'}}>{'Шаг в будущее'}</Typography>
                <Typography variant='h6' sx={{width: 3/5, fontWeight: 'normal'}}>{'На портале собраны задания и разборы решений за предыдущие годы, \
                    которые помогут подготовиться к олимпиаде'}</Typography>
            </Box>

            <ButtonContained href={'https://olymp.bmstu.ru/ru'} target={'_blank'} style={{marginTop: '32px', alignSelf: 'flex-start'}}>
                <LanguageOutlinedIcon sx={{fontSize: 18, mr: '4px'}}></LanguageOutlinedIcon>
                Сайт Олимпиады
            </ButtonContained>
            
        </Box>
     );
}

export default Banner;