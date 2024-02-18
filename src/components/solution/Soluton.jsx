import React, { useState } from "react";
import { Box,Typography, TextField, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import ButtonOutlined from "../buttonOutlined/buttonOutlined";
import ButtonContained from "../buttonContained/buttonContained";
import Alert from '@mui/material/Alert';
import answerImageAnswerTest from '../../assets/tasks/answerImage/answer1.png';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Solution({task, index, setIndexSolution, length}) {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;

    let [isIsHideAnswer, setIsHideAnswer] = useState(true);

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

    const bodyLargeStyle = {
        ...theme.typography.body.large,
        color: theme.palette.grey.dark
    }
    
    const bodyMainStyle = {
        ...theme.typography.body.main,
        color: theme.palette.black.main
    }
    
    const descriptionStyle = {
        ...theme.typography.body.main,
        color: theme.palette.grey.dark,
        mt: '10px'
    } 
    
    const buttonGroupStyle = {
        display: 'flex',
        flexWrap: 'wrap', 
        gap: '8px', 
        justifyContent: {md: 'flex-end', xs: 'flex-start'}, 
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
        display: (isIsHideAnswer ? 'block' : 'none'),
        width: '100%', 
        mt: '12px',  
    }
    
    let solutionStyle = {
        mt: '12px',  
        width: '100%', 
        display: (isIsHideAnswer ? 'none' : 'block')
    }

    let [isOpenWindowSolution, setIsOpenWindowSolution] = useState(true);
    let [isShowSuccessAlert, setIsShowSuccessAlert] = useState(true);
    let [isShowNotSuccessAlert, setIsShowNotSuccessAlert] = useState(false);
    let [textNotSuccessAnswer, setTextNotSuccessAnswer] = useState('');
    let [buttonHideSolution, setButtonHideSolution] = useState(true);

    let toggleWindowSolution = () => {setIsOpenWindowSolution(!isOpenWindowSolution)};

    let showAnswer = () => {
        setIsHideAnswer(false);
        setIsShowSuccessAlert(false);
    }

    let checkAnswer = () => {
        let isCorrectAnswer = null
        // сделать валидацию
        // проверить решал ли user задачу
        try {
            isCorrectAnswer = true // fetch
        } catch (error) {
            textNotSuccessAnswer = `Произошла ошибка ${error}`
        }

        if (isCorrectAnswer) {
            setIsHideAnswer(false);
        } else if (!isCorrectAnswer) {
            setTextNotSuccessAnswer('😔  Неверный ответ. Проверьте решение');
            setIsShowNotSuccessAlert(true);
        }
        // сохранить прогресс user
    }

    let resetSolve = () => {
        setIsHideAnswer(true);
        setTextNotSuccessAnswer('');
        setButtonHideSolution(true)
    }

    let hideSolution = () => {
        setIsHideAnswer(true);
        setButtonHideSolution(false);
        setTextNotSuccessAnswer('Чтобы начать заново нажмите на  «Показать решение» -> «Решить заново»');
        setIsShowNotSuccessAlert(true);
    }


    return(
        <>
            <Box sx={taskStyle}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <Typography sx={titleMediumStyle}>Задача {index}</Typography>
                        <Typography sx={bodyMainStyle}>
                            {task.difficult} • {task.year}</Typography>
                    </Box>
                    <IconButton onClick={toggleWindowSolution}>
                        {isOpenWindowSolution ? <KeyboardArrowUpIcon fontSize="large"></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon fontSize="large"></KeyboardArrowDownIcon>}
                    </IconButton>
                </Box>
                <Box variant='span' style={{display: (isOpenWindowSolution ? 'block' : 'none')}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap'}}>
                        {task.imageTasks.map((a, b) => {
                            return (
                                <img src={a} alt={`Изображение ${b+1}`} style={{width: '100%'}} key={`image ${b}`}/>                         
                            )
                        })}
                    </Box>
                    <Typography sx={descriptionStyle}>{task.description}</Typography>

                    <Box sx={groupTextFieldStyle}>
                        <TextField id="" label="Ответ" variant="outlined"  sx={{width: '100%'}} disabled={!buttonHideSolution}/>
                        <Typography fontSize='small' sx={{color:'#B3261E', display: (isShowNotSuccessAlert ? 'block' : 'none')}}>{textNotSuccessAnswer}</Typography>
                    </Box>

                    <Box sx={solutionStyle}>
                        <Box variant='span' sx={{display: (isShowSuccessAlert ? 'block' : 'none')}}>
                            <Alert icon={false} severity="success" sx={{borderRadius: '12px', }}
                             onClose={() => {setIsShowSuccessAlert(false)}}>🥳  Правильный ответ</Alert>
                        </Box>
                        <Box sx={{my: '16px'}}>
                            <Typography sx={titleMediumStyle}>Решение</Typography>
                            <Typography sx={bodyMainStyle}>Ответ: {task.answer}</Typography>
                        </Box>

                        <Box sx={answerStyle}>
                            {task.solution.map((array, index) => {
                                return (
                                    <Box sx={{mt: '20px'}} key={`div ${index}`}>
                                        {
                                        array.map((text, index2) => {
                                            if (!(text.includes('https://'))) return <Typography sx={bodyLargeStyle} key={`solutionText ${index}.${index2}`}>{text}</Typography>
                                            else {
                                                return <img src={`${text}`} alt={`Изображение решения ${index}.${index2}`} loading="lazy"
                                                key={`solutionText ${index}.${index2}`} style={{width: {md: '70%', xs: '90%'}, mixBlendMode: 'multiply'}}/>
                                                }
                                        })
                                        }
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box sx={buttonGroupStyle}>
                        {isIsHideAnswer ? 
                        <>
                            <ButtonOutlined onClick={showAnswer}>Показать решение</ButtonOutlined>
                            <ButtonContained onClick={checkAnswer}>Проверить ответ</ButtonContained>
                        </>
                        :
                        <>
                            <ButtonContained onClick={resetSolve}>Решить заново</ButtonContained>
                            <ButtonOutlined onClick={hideSolution}>Скрыть решение</ButtonOutlined>
                        </>
                        }
                    </Box>

                </Box>
            </Box>
            
            <Box>
                <Box sx={{display: 'flex', flexDirection: 'row',  gap: '12px'}}>
                    {index === 1 ? '' :
                    (<Box sx={linkToTask} onClick={() => setIndexSolution(index-2)}>
                        <Box sx={cardLinkToNextTaskStyle}>
                            <SkipPreviousOutlinedIcon sx={{fontSize:'24px',}}></SkipPreviousOutlinedIcon>
                            <Typography sx={titleMediumVioletStyle}>Предыдущая</Typography>
                        </Box>
                        <Typography sx={subtitle1Style}>Задача {index - 1}</Typography>
                    </Box>)
                    }

                    {index === length ? '' :
                    (<Box sx={linkToTask} onClick={() => setIndexSolution(index)}>    
                        <Box sx={cardLinkToNextTaskStyle}>
                            <Typography sx={titleMediumVioletStyle}>Следующая</Typography>
                            <SkipNextOutlinedIcon sx={{fontSize:'24px'}}></SkipNextOutlinedIcon>
                        </Box>
                        <Typography sx={subtitle1Style}>Задача {index + 1}</Typography>
                    </Box>)
                    }
                    
                </Box>
            </Box>
        </>
    )
}

export default Solution;