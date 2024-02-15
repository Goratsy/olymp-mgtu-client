import React, { useState } from "react";
import { Box,Typography, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import ButtonOutlined from "../buttonOutlined/buttonOutlined";
import ButtonContained from "../buttonContained/buttonContained";
import Alert from '@mui/material/Alert';
import answerImageAnswerTest from '../../assets/tasks/answerImage/answer1.png';

function Solution({task, index}) {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;

    let [showAlert, setShowAlert] = useState(false);
    let [isShowAnswer, setIsShowAnswer] = useState(false);

    const taskStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: bgCard,
        borderRadius: '12px',
        mb: '12px',
        p: '16px',
        overflow: 'hidden'
    };
    
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
        <>
            <Box sx={taskStyle}>
                <Box>
                    <Typography sx={titleMediumStyle}>Задача {index}</Typography>
                    <Typography sx={bodyMainStyle}>
                        {task.difficult} • {task.year}</Typography>
                </Box>
                
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                    {task.imageTasks.map((a, b) => {
                        return (
                            <img src={a} alt={`Изображение ${b+1}`} style={{width: '50%'}} key={`image ${b}`}/>
                        )
                    })}
                </Box>
                <Typography sx={descriptionStyle}>{task.description}</Typography>

                <Box sx={groupTextFieldStyle}>
                    <TextField id="" label="Ответ" variant="outlined"  sx={{width: '100%'}}/>
                    <Typography fontSize='small' sx={{color:'#B3261E', display: (showAlert ? 'block' : 'none')}}>😔  Неверный ответ. Проверьте решение</Typography>
                </Box>

                <Box sx={solutionStyle}>
                    <Alert icon={false} severity="success" sx={{borderRadius: '12px'}} onClose={() => {console.log('closed');}}>🥳  Правильный ответ</Alert>
                    <Box sx={{my: '16px'}}>
                        <Typography sx={titleMediumStyle}>Решение</Typography>
                        <Typography sx={bodyMainStyle}>Ответ: {task.answer}</Typography>
                    </Box>

                    <Box sx={answerStyle}>
                        {/* Здесь распологается решение присланное из сервера */}
                        <div>
                            <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                            <img src={answerImageAnswerTest} style={{width: '30vw'}} alt=""/> 
                        </div>
                        <div>
                            <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                            <img src={answerImageAnswerTest} style={{width: '30vw'}} alt=""/> 
                        </div>
                        <div>
                            <p>Запишем уравнения динамики для каждого груза в первом случае.</p>
                            <img src={answerImageAnswerTest} style={{width: '30vw'}} alt=""/> 
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
                    {index === 1 ? '' :
                    (<Box sx={linkToTask}>
                        <Box sx={cardLinkToNextTaskStyle}>
                            <SkipPreviousOutlinedIcon sx={{fontSize:'24px',}}></SkipPreviousOutlinedIcon>
                            <Typography sx={titleMediumVioletStyle}>Предыдущая</Typography>
                        </Box>
                        <Typography sx={subtitle1Style}>Задача {index - 1}</Typography>
                    </Box>)
                    }
                    <Box sx={linkToTask}>    
                        <Box sx={cardLinkToNextTaskStyle}>
                            <Typography sx={titleMediumVioletStyle}>Следующая</Typography>
                            <SkipNextOutlinedIcon sx={{fontSize:'24px'}}></SkipNextOutlinedIcon>
                        </Box>
                        <Typography sx={subtitle1Style}>Задача {index + 1}</Typography>
                    </Box>
                    {/* Доработать ссылки */}
                </Box>
            </Box>
        </>
    )
}

export default Solution;