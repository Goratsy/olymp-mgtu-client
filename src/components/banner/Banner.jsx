import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import bgBanner from '../../assets/bgBanner.jpg';
import ButtonContained from '../buttonContained/buttonContained';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

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

// Сделать всем нормальные отступы
    return (
        <Box className={classes.bannerStyle} sx={{
            py: '56px',
            color: 'black',
        }}>
            <Container>
                <Typography sx={{color:'#6750A4', fontWeight: 'normal'}}>Подготовка к олимпиаде</Typography>

                <Box sx={{mt: '8px'}}>
                    <Typography variant='h1' sx={{fontWeight:'bold', fontSize: '80px'}}>{'Шаг в будущее'}</Typography>
                    {/* Надо скачать Шрифт */}
                    <Typography variant='h6' sx={{width: 3/4, fontWeight: 'normal', mt: '8px'}}>{'На портале собраны задания и разборы решений за предыдущие годы, \
                        которые помогут подготовиться к олимпиаде'}</Typography>
                </Box>

                <ButtonContained href={'https://olymp.bmstu.ru/ru'} target={'_blank'} style={{marginTop: '32px'}}>
                    <LanguageOutlinedIcon sx={{fontSize: 18, mr: '4px'}}></LanguageOutlinedIcon>
                    Сайт Олимпиады
                </ButtonContained>
            </Container>
        </Box>
     );
}

export default Banner;