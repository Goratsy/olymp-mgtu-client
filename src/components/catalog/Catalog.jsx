import { Box,Grid,Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import { useTheme } from "@emotion/react";
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import ButtonOutlined from "../buttonOutlined/buttonOutlined";
import ButtonContained from "../buttonContained/buttonContained";
import Alert from '@mui/material/Alert';

import imageTaskTest from '../../assets/tasks/1.png';
import answerImageAnswerTest from '../../assets/tasks/answerImage/answer1.png';

function Catalog() {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;


    const taskStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: bgCard,
        borderRadius: '12px',
        mb: '12px',
        p: '16px',
    };

    const catalogStyle = {
        borderRadius: '12px',
        overflow: 'hidden'
    }

    const titleMediumStyle = {
        ...theme.typography.titles.medium,
        color: theme.palette.black.main
    }

    const bodyMainStyle = {
        ...theme.typography.body.main,
        color: theme.palette.black.main
    }

    const descriptionStyle = {
        ...theme.typography.body.main,
        color: theme.palette.grey.dark,
    } 

    const buttonGroupStyle = {
        display: 'flex', 
        gap: '8px', 
        justifyContent: 'flex-end', 
        mt: '20px'
    }

    const answerStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        color: theme.palette.grey.dark, 
        fontSize: '14px', 
        fontFamily: 'Roboto, sans-serif', 
    }

    const linkToTask = {
        backgroundColor: bgCard,
        borderRadius: '16px',
        p: '20px',
        flexGrow: 1,
    }

    const subtitle1Style = {
        ...theme.typography.titles.subtitle1,
        color: theme.palette.black.main,
    }

    const titleMediumVioletStyle = {
        ...theme.typography.titles.medium,
        color: theme.palette.violet.title,
    }

    const cardLinkToNextTaskStyle = {
        color: theme.palette.violet.title, 
        display:'flex', 
        alignItems:'center', 
        gap: '4px'
    }

    const arrtask = [{
        difficult: 'Легкая',
        yearTask: 2022,
        description: 'Два груза массами m1 и m2 связаны невесомой нерастяжимой нитью и находятся на горизонтальной поверхности. Коэффициенты трения между каждым грузом и поверхностью одинаковы. Если к грузу массой m1 приложить горизонтально направленную силу F1 (см. первый рисунок), то нить разорвется, когда F1 >= 10 Н. Если же горизонтально направленную силу F2 приложить к грузу массой m2 (см. второй рисунок), то нить разорвется, когда F2 >= 2,5 Н. Чему равно отношение масс грузов m1/m2? Ответ округлите до десятых',
        image: imageTaskTest,
        answer: 4.0,
    }];
    
    let [showAlert, setShowAlert] = useState('none');
    let [isShowAnswer, setIsShowAnswer] = useState(true)

    let groupTextFieldStyle = {
        display: (isShowAnswer ? 'block' : 'none'),
        width: '100%', 
        mt: '12px',  
    }

    let solutionStyle = {
        mt: '12px',  
        width: '100%', 
        display: (isShowAnswer ? 'none' : 'block')
    }

    return(
        <Grid container spacing={3} columns={4}>
            <Grid item xs={2}>
                <Box sx={catalogStyle}>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    <TaskCard task={arrtask[0]} index={'1'}></TaskCard>
                    {/* Сделать map когда добавятся карты */}
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box sx={taskStyle}>
                    <Box>
                        <Typography sx={titleMediumStyle}>
                            Задача {'1'}</Typography>
                        <Typography sx={bodyMainStyle}>
                            {arrtask[0].difficult} • {arrtask[0].yearTask}</Typography>
                    </Box>
                    
                    <img src={arrtask[0].image} alt='задача'/>
                    <Typography sx={descriptionStyle}>{arrtask[0].description}</Typography>

                    <Box sx={groupTextFieldStyle}>
                        <TextField id="" label="Ответ" variant="outlined"  sx={{width: '100%'}}/>
                        <Typography fontSize='small' sx={{color:'#B3261E', display: showAlert}}>😔  Неверный ответ. Проверьте решение</Typography>
                    </Box>

                    <Box sx={solutionStyle}>
                        <Alert icon={false} severity="success" sx={{borderRadius: '12px'}} onClose={() => {console.log('closed');}}>🥳  Правильный ответ</Alert>
                        <Box sx={{my: '16px'}}>
                            <Typography sx={titleMediumStyle}>Решение</Typography>
                            <Typography sx={bodyMainStyle}>Ответ: {arrtask[0].answer}</Typography>
                        </Box>

                        <Box sx={answerStyle}>
                            {/* Здесь распологается решение присланное из сервера */}
                            <div>
                                <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                                <img src={answerImageAnswerTest} style={{width: '30vw'}}/> 
                            </div>
                            <div>
                                <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                                <img src={answerImageAnswerTest} style={{width: '30vw'}}/> 
                            </div>
                            <div>
                                <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                                <img src={answerImageAnswerTest} style={{width: '30vw'}}/> 
                            </div>
                            
                        </Box>
                    </Box>
                    <Box sx={buttonGroupStyle}>
                        <ButtonOutlined>Показать решение</ButtonOutlined>
                        <ButtonContained>Проверить ответ</ButtonContained>
                        {/* <ButtonOutlined>Скрыть решение</ButtonOutlined> */}
                    </Box>
                </Box>
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'row',  gap: '12px'}}>
                        <Box sx={linkToTask}>
                            <Box sx={cardLinkToNextTaskStyle}>
                                <SkipPreviousOutlinedIcon sx={{fontSize:'24px',}}></SkipPreviousOutlinedIcon>
                                <Typography sx={titleMediumVioletStyle}>Предыдущая</Typography>
                            </Box>
                            <Typography sx={subtitle1Style}>Задача 1</Typography>
                        </Box>
                        <Box sx={linkToTask}>    
                            <Box sx={cardLinkToNextTaskStyle}>
                                <Typography sx={titleMediumVioletStyle}>Следующая</Typography>
                                <SkipNextOutlinedIcon sx={{fontSize:'24px'}}></SkipNextOutlinedIcon>
                            </Box>
                            <Typography sx={subtitle1Style}>Задача 3</Typography>
                        </Box>
                        {/* Доработать ссылки */}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Catalog;