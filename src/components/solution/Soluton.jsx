import React, { useEffect, useState } from "react";
import { Box,Typography, TextField, IconButton, Tooltip, ClickAwayListener } from "@mui/material";
import { useTheme } from "@emotion/react";
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import ButtonOutlined from "../buttonOutlined/buttonOutlined";
import ButtonContained from "../buttonContained/buttonContained";
import Alert from '@mui/material/Alert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useInfoSolutionContext } from "../../App";
import chatGptIcon from '../../assets/ChatGPT.svg';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Loading from '../../assets/loading1.svg';
import { urlBase } from "../../config";

function Solution({task, index, setIndexSolution, length}) {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;

    let {answerValue, setAnswerValue, isHideAnswer, setIsHideAnswer, textNotSuccessAnswer, setTextNotSuccessAnswer, answerFromGPT, setAnswerFromGPT} = useInfoSolutionContext();


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

    } 
    
    const buttonGroupStyle = {
        display: 'flex',
        flexWrap: 'wrap', 
        gap: '8px', 
        justifyContent: {lg: 'flex-end', xs: 'flex-start'}, 
        mt: '20px'
    }
    
    const answerStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        color: theme.palette.grey.dark, 
        fontSize: '14px', 
        fontFamily: 'Roboto, sans-serif',     }
    
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
        display: (isHideAnswer ? 'block' : 'none'),
        width: '100%', 
        mt: '12px',  
    }
    
    let solutionStyle = {
        mt: '12px',  
        width: '100%', 
        display: (isHideAnswer ? 'none' : 'block')
    }

    let [isOpenWindowSolution, setIsOpenWindowSolution] = useState(true);
    let [isShowSuccessAlert, setIsShowSuccessAlert] = useState(true);
    let [isShowNotSuccessAlert, setIsShowNotSuccessAlert] = useState(false);
    let [buttonHideSolution, setButtonHideSolution] = useState(true);
    let [IsOpenTooltip, setIsOpenTooltip] = useState(false);
    let [IsLoading, setIsLoading] = useState(false);

    const CloseTooltip = () => {setIsOpenTooltip(false);};
    const ToggleTooltip = () => {setIsOpenTooltip(!IsOpenTooltip);};
    


    let toggleWindowSolution = () => {setIsOpenWindowSolution(!isOpenWindowSolution)};

    let showAnswer = () => {
        setIsHideAnswer(false);
        setIsShowSuccessAlert(false);
    }

    let checkAnswer = async () => {
        let isCorrectAnswer = null;
        try {
            if (answerValue.length === 0) {
                throw new Error('Заполните поле ввода!');
            }
            if (isNaN(Number(answerValue))) {
                throw new Error('Вводимые в поле данные должны быть числами!');
            }

            await fetch(`${urlBase}/checkAnswer/?id=${task._id}&answer=${answerValue}`)
                .then(data => data.json())
                .then(data => {isCorrectAnswer = data.isCorrectAnswer});

        } catch (error) {
            setIsShowNotSuccessAlert(true);
            setTextNotSuccessAnswer(`Произошла ошибка: ${error.message}`);
    }

        if (isCorrectAnswer === true) {
            setIsHideAnswer(false);
            setIsShowSuccessAlert(true)
            localStorage.setItem(`${task._id}Stage`, 'done');
        } else if (isCorrectAnswer === false) {
            setTextNotSuccessAnswer('😔  Неверный ответ. Проверьте решение');
            setIsShowNotSuccessAlert(true);
        }
    }

    let resetSolve = () => {
        setIsHideAnswer(true);
        setTextNotSuccessAnswer('');
        setButtonHideSolution(true);
    }

    useEffect(() => {
        if (localStorage.getItem(`${task._id}`) !== null) {
            setAnswerValue(localStorage.getItem(`${task._id}`));
        } else {
            setAnswerValue('');
        }
    })

    function requestToChatGPT() {
        const extensions = ['.java','.cpp', '.h', '.hpp','.py','.js', '.txt', '.rb','.cs','.go','.swift','.ts','.kt','.rs'];
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        
    
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            let extensionOfFile = file?.name.split('.');
            extensionOfFile = '.' + extensionOfFile[extensionOfFile.length-1];

            if (extensions.includes(extensionOfFile) && Number(file.size) / (8*1024*1024) <= 1) {
                setIsLoading(true);

                fetch(`${urlBase}/getSolutionFromGPT/?id=${task._id}`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                        if (!response.ok) {
                            throw new Error(`Ошибка! Код http-ответа: ${response.status}`);
                        }
                        return response.json();
                })
                .then(data => {
                        console.log(data);
                        setAnswerFromGPT(data.answerFromGPT);
                        setIsLoading(false);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    setIsLoading(false)
                });
            } else {alert('Размер файла должен быть до 1МБ, и поддерживаются расширения только этих форматов: .java, .cpp, .h, .hpp, .py, .js, .txt, .rb, .cs, .go, .swift, .ts, .kt, .rs');}


        } else {alert('Прикрепите файл, чтобы отправить его запрос');}

        }


    return(
        <>
            <Box sx={taskStyle}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <Typography sx={titleMediumStyle}>Задача {index}</Typography>
                        <Typography sx={bodyMainStyle}>
                            {task.difficult} • {task.year} • {task.points} баллов</Typography>
                    </Box>
                    <IconButton onClick={toggleWindowSolution}>
                        {isOpenWindowSolution ? <KeyboardArrowUpIcon fontSize="large"></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon fontSize="large"></KeyboardArrowDownIcon>}
                    </IconButton>
                </Box>
                <Box variant='span' style={{display: (isOpenWindowSolution ? 'block' : 'none')}}>
                    {task.imageTasks.length !== 0 ? 
                    <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap'}}>
                        {task.imageTasks.map((src, index) => {
                            return (
                                <img src={src} alt={`Изображение ${index+1}`} style={{width: '100%', marginBottom: '10px', mixBlendMode: 'multiply'}} key={`image ${task._id}${index}`}/>                         
                            );
                        })}
                    </Box>
                    : ''}
                    <Typography sx={descriptionStyle}>{task.description}</Typography>

                    <Box sx={groupTextFieldStyle}>
                        <TextField id="answerInput" label="Ответ" variant="outlined"  sx={{width: '100%'}} disabled={!buttonHideSolution} 
                            value={answerValue}
                            onChange={(e) => {
                                setAnswerValue(e.target.value);
                                localStorage.setItem(`${task._id}`, `${e.target.value}`);
                            }}
                            type="number"
                        />
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
                                            if (!(text.includes('https://'))) return <Typography sx={bodyLargeStyle} key={`solutionText ${index}.${index2}`}><Box sx={{whiteSpace: 'pre-wrap'}}>{text}</Box></Typography>
                                            else {
                                                return <Box sx={{width:'100%'}}>
                                                        <img src={`${text}`} alt={`Изображение решения ${index}.${index2}`} loading="lazy"
                                                        key={`solutionText ${task._id}${index}.${index2}`} style={{width: '100%', mixBlendMode: 'multiply'}}/>
                                                </Box> 
                                                }
                                        })
                                        }
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    <Box sx={buttonGroupStyle}>
                        {isHideAnswer ? 
                        <>
                            <ButtonOutlined onClick={showAnswer}>Показать решение</ButtonOutlined>
                            <ButtonContained onClick={checkAnswer}>Проверить ответ</ButtonContained>
                        </>
                        :
                        <>
                            <ButtonOutlined onClick={resetSolve}>Скрыть решение</ButtonOutlined>
                        </>
                        }
                    </Box>

                    {(task.subject === 'programming' && !isHideAnswer) ? 
                        <>
                            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', my: '20px', gap:'10px'}}>
                                <TextField type="file" id="fileInput"></TextField>
                                <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', mt: {md: '0px', xs: '10px'}, flexDirection: {xs: 'row-reverse', lg: 'row'}}}>
                                    <ClickAwayListener onClickAway={CloseTooltip}>
                                        <div>
                                            <Tooltip
                                                PopperProps={{
                                                disablePortal: true,
                                                }}
                                                onClose={ToggleTooltip}
                                                open={IsOpenTooltip}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title="Если вы не понимаете, как решить задачу по программированию или хотите сравнить ваш ответ с авторским, можете воспользоваться помощью от чата GPT. Загрузите файл в нужном формате и убедитесь, что в вашем файле написан только необходимый код, чтобы GPT ответил наиболее точно, далее нажмите на кнопку отправки"
                                            >
                                                <IconButton onClick={ToggleTooltip}>
                                                    <QuestionMarkIcon></QuestionMarkIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </ClickAwayListener>
                                    <ButtonContained onClick={requestToChatGPT}>
                                        <img src={chatGptIcon} alt="gpticon" style={{width: '30px', marginRight: '4px'}}/>
                                        <Box variant='span' sx={{mr: '4px'}}>GPT Помоги!</Box>
                                    </ButtonContained>
                                </Box>
                            </Box>
                            
                            {answerFromGPT ? 
                            <>
                                <Typography sx={titleMediumStyle}>Ответ от GPT:</Typography>
                                <Typography sx={bodyLargeStyle}>
                                    <Box sx={{width: '80%', whiteSpace: 'preserve'}}>{answerFromGPT}</Box>
                                </Typography>
                            </>
                            : 
                            <>
                            {IsLoading ? <img src={Loading} alt="Loading..." style={{mixBlendMode: 'multiply', width: '60px', height: '60px'}}/> : '' }
                            </>
                            }
                        </> : ''
                    }
                    
                </Box>
            </Box>
            
            <Box>
                <Box sx={{display: 'flex', flexDirection: 'row',  gap: '12px'}}>
                    {index === 1 ? '' :
                    (<Box sx={linkToTask} onClick={() => {
                        setIndexSolution(index-2);
                        setAnswerValue('');
                        setIsHideAnswer(true);
                        }}>
                        <Box sx={cardLinkToNextTaskStyle}>
                            <SkipPreviousOutlinedIcon sx={{fontSize:'24px',}}></SkipPreviousOutlinedIcon>
                            <Typography sx={titleMediumVioletStyle}>Предыдущая</Typography>
                        </Box>
                        <Typography sx={subtitle1Style}>Задача {index - 1}</Typography>
                    </Box>)
                    }

                    {index === length ? '' :
                    (<Box sx={linkToTask} onClick={() => {
                        setIndexSolution(index);
                        setAnswerValue('');
                        setIsHideAnswer(true);
                        }}>    
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