import { Box, Typography } from '@mui/material';
import React from 'react';
import bgBanner from '../../assets/bgBanner.jpg';
import ButtonContained from '../buttonContained/buttonContained';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useTheme } from '@emotion/react';



function Banner() {
    const theme = useTheme();
    const bannerStyle = {
        backgroundImage: `url(${bgBanner})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
        borderRadius: "24px",

        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        p: '56px',
        color: 'black',
    };
    const bodyLarge1Style = {
        ...theme.typography.body.large,
        color: theme.palette.violet.main,
    }
    const bodyLarge2Style = {
        ...theme.typography.body.large,
        width: 2/5,
        color: theme.palette.black.light,
    }
    const h1Style = {
        ...theme.typography.titles.h1
    }
    const labelLargeStyle = {
        ...theme.typography.label.large,
        mr: '4px',
    }
    return (
        <Box sx={bannerStyle}>
            <Typography sx={bodyLarge1Style}>Подготовка к олимпиаде</Typography>
            <Box>
                <Typography variant='h1' sx={h1Style}>{'Шаг в будущее'}</Typography>
                <Typography sx={bodyLarge2Style}>{'На портале собраны задания и разборы решений за предыдущие годы, \
                    которые помогут подготовиться к олимпиаде'}</Typography>
            </Box>
            <ButtonContained href={'https://olymp.bmstu.ru/ru'} target={'_blank'} style={{marginTop: '32px', alignSelf: 'flex-start'}}>
                <LanguageOutlinedIcon sx={{fontSize: 18, mr: '4px'}}></LanguageOutlinedIcon>
                <Typography sx={labelLargeStyle}> Сайт Олимпиады</Typography>
            </ButtonContained>
            
        </Box>
     );
}

export default Banner;