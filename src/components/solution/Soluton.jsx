import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton, Tooltip, ClickAwayListener, Dialog, useMediaQuery, Button, InputLabel } from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import Markdown from 'react-markdown'


function Solution({ task, index, setIndexSolution, length }) {
    const theme = useTheme();
    const bgCard = theme.palette.violet.light;
    let mediaDialog = useMediaQuery('(max-width:900px)');
    let { answerValue, setAnswerValue, isHideAnswer, setIsHideAnswer, textNotSuccessAnswer, setTextNotSuccessAnswer, answerFromGPT, setAnswerFromGPT, isOpenDialog, setIsOpenDialog } = useInfoSolutionContext();

    const inputFilesStyle = {
        width: '100%',
        my: '24px',
        p: '24px',
        border: '2px dashed #E0D9E0',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px'
    }

    const taskStyle = {
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: bgCard,
        borderRadius: '12px',
        mb: '12px',
        p: '16px',
        overflow: 'hidden'
    };

    const dialogStyle = {
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: bgCard,
        height: '100%',
        p: '16px'
    };

    const titleMediumStyle = {
        ...theme.typography.titles.medium,
        color: theme.palette.black.main
    }

    const titleLargeStyle = {
        ...theme.typography.titles.large,
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
        justifyContent: 'space-between',
        mt: '28px'
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
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    }

    let groupTextFieldStyle = {
        display: (isHideAnswer ? 'block' : 'none'),
        width: '100%',
        mt: '24px',
    }

    let solutionStyle = {
        mt: '16px',
        width: '100%',
        display: (isHideAnswer ? 'none' : 'block')
    }

    let [isOpenWindowSolution, setIsOpenWindowSolution] = useState(true);
    let [isShowSuccessAlert, setIsShowSuccessAlert] = useState(true);
    let [isShowNotSuccessAlert, setIsShowNotSuccessAlert] = useState(false);
    let [buttonHideSolution, setButtonHideSolution] = useState(true);
    let [IsOpenTooltip, setIsOpenTooltip] = useState(false);
    let [IsLoading, setIsLoading] = useState(false);
    let [filesList, setFilesList] = useState([]);
    let [isErrorFileList, setIsErrorFileList] = useState(false);


    const CloseTooltip = () => { setIsOpenTooltip(false); };
    const ToggleTooltip = () => { setIsOpenTooltip(!IsOpenTooltip); };

    let toggleWindowSolution = () => { setIsOpenWindowSolution(!isOpenWindowSolution) };

    let showAnswer = () => {
        setIsHideAnswer(false);
        setIsShowSuccessAlert(false);
        setTextNotSuccessAnswer('');
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
                .then(data => { isCorrectAnswer = data.isCorrectAnswer });

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
        if (task.subject === 'programming') {
            setIsHideAnswer(true);
        } else {
            localStorage.setItem(`${task._id}`, '')
            setIsHideAnswer(true);
            setTextNotSuccessAnswer('');
            setButtonHideSolution(true);

        }
    }

    useEffect(() => {
        setIsErrorFileList(false);
        setFilesList([]);
    }, [task._id])

    useEffect(() => {

        if (localStorage.getItem(`${task._id}`) !== null) {
            setAnswerValue(localStorage.getItem(`${task._id}`));
        } else {
            setAnswerValue('');
        }
    })

    let changeInputFile = () => {
        setIsErrorFileList(false);
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0]
        if (fileInput.files[0]) {
            if (Math.round(Number(file.size) / 8) <= 1024 * 1024 && Math.round(Number(file.size) / 8) >= 15) {
                setFilesList([fileInput.files[0]])
            } else {
                setFilesList([fileInput.files[0]])
                setIsErrorFileList(true);
            }
        }
    }

    let requestToChatGPT = () => {
        const file = filesList[0];
        setAnswerFromGPT('');

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            if (Math.ceil(Number(file.size) / 8) <= 1024 * 1024 && Math.ceil(Number(file.size) / 8) >= 15) {
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
                        setAnswerFromGPT(data.answerFromGPT);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                        setIsLoading(false);
                    });
            } else { alert('Размер файла должен быть от 15 Байт до 1МБ'); }


        } else { alert('Прикрепите файл, чтобы отправить его запрос'); }

    }

    const closeDialog = () => { setIsOpenDialog(false); };


    return (
        <>
            <Box sx={taskStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={titleLargeStyle}>Задача {task._id.slice(0, 4) + task._id.slice((task._id.length) - 5, (task._id.length))}</Typography>
                        <Typography sx={bodyMainStyle}>{task.difficult} • {task.year} • {task.points} баллов</Typography>
                    </Box>
                    <IconButton onClick={toggleWindowSolution}>
                        {isOpenWindowSolution ? <KeyboardArrowUpIcon fontSize="large"></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon fontSize="large"></KeyboardArrowDownIcon>}
                    </IconButton>
                </Box>

                <Box variant='span' sx={{ display: (isOpenWindowSolution ? 'block' : 'none') }}>

                    {task.imageTasks.length !== 0 ?
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                            {task.imageTasks.map((src, index) => {
                                return (
                                    <img src={src} alt={`Изображение ${index + 1}`} style={{ width: '100%', marginBottom: '16px', mixBlendMode: 'multiply' }} key={`image ${task._id}${index}`} />
                                );
                            })}
                        </Box>
                        : ''}

                    <Typography sx={descriptionStyle}>{task.description}</Typography>

                    {task.subject !== 'programming' ?
                        <Box sx={groupTextFieldStyle}>
                            <TextField id="answerInput" label="Ответ" variant="outlined" sx={{ width: '100%' }} disabled={!buttonHideSolution}
                                value={answerValue}
                                onChange={(e) => {
                                    setAnswerValue(e.target.value);
                                    localStorage.setItem(`${task._id}`, `${e.target.value}`);
                                }}
                                type="number"
                            />
                            <Typography fontSize='small' sx={{ color: '#B3261E', display: (isShowNotSuccessAlert ? 'block' : 'none') }}>{textNotSuccessAnswer}</Typography>
                        </Box>
                        : ''}

                    <Box sx={solutionStyle}>
                        {task.subject !== 'programming' ?
                            <>
                                <Box variant='span' sx={{ display: (isShowSuccessAlert ? 'block' : 'none') }}>
                                    <Alert icon={false} sx={{ borderRadius: '12px', bgcolor: theme.palette.grey.light }}
                                        onClose={() => { setIsShowSuccessAlert(false) }}>🥳  Правильный ответ</Alert>
                                </Box>
                                <Box sx={{ my: '16px' }}>
                                    <Typography sx={titleMediumStyle}>Решение</Typography>
                                    <Typography sx={bodyMainStyle}>Ответ: {task.answer}</Typography>
                                </Box>
                            </>
                            :
                            <>
                                <Box sx={{ mb: '16px' }}>
                                    <Typography sx={titleMediumStyle}>Решение</Typography>
                                    <Typography sx={bodyMainStyle}>Авторский код:</Typography>
                                </Box>
                                <Typography sx={{ whiteSpace: 'preserve' }}>
                                    <Typography component={'pre'} style={{ margin: '0px' }}>
                                        <Typography component={'code'}>
                                            {task.answerCode}
                                        </Typography>
                                    </Typography>
                                </Typography>
                            </>
                        }

                        <Box sx={answerStyle}>
                            {task.solution.map((array, index) => {
                                return (
                                    <Box key={`div ${task._id}${index}`}>
                                        {
                                            array.map((text, index2) => {
                                                if (!(text.includes('https://'))) return <Typography sx={bodyLargeStyle} key={`solutionText ${index}.${index2}`}><Box sx={{ whiteSpace: 'pre-wrap' }}>{text}</Box></Typography>
                                                else {
                                                    return <Box sx={{ width: '100%' }}>
                                                        <img src={`${text}`} alt={`Изображение решения ${index}.${index2}`} loading="lazy"
                                                            key={`solutionText ${task._id}${index}.${index2}`} style={{ width: '100%', mixBlendMode: 'multiply' }} />
                                                    </Box>
                                                }
                                            })
                                        }
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    {task.subject !== 'programming' ?
                        <Box sx={buttonGroupStyle}>
                            {(isHideAnswer) ?
                                <>
                                    <ButtonOutlined onClick={showAnswer}>Показать решение</ButtonOutlined>
                                    <ButtonContained onClick={checkAnswer}>Проверить ответ</ButtonContained>
                                </>
                                :
                                <ButtonOutlined onClick={resetSolve}>Сбросить</ButtonOutlined>
                            }
                        </Box>
                        : ''}


                    {(task.subject === 'programming') ?
                        <>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                {filesList.length === 0 ?
                                    <>
                                        <TextField
                                            accept="text/*"
                                            style={{ display: 'none' }}
                                            id="fileInput"
                                            type="file"
                                            inputProps={{
                                                accept: '.txt,.py,.js,.html,.css,.java,.cpp',
                                            }}
                                            onChange={changeInputFile}
                                        />
                                        <InputLabel htmlFor="fileInput" sx={inputFilesStyle}>
                                            <UploadFileIcon sx={{ color: '#2196F3', mb: '8px' }}></UploadFileIcon>
                                            <Typography sx={{ color: '#000000', fontSize: '16px' }}><Typography component="span" style={{ color: '#2196F3', textDecoration: 'underline #2196F3' }}>Выберите файл</Typography> или перетащите его сюда</Typography>
                                            <Typography sx={{ fontSize: '14px' }}>TXT, PY, JS, JAVA (макс. 1MB)</Typography>
                                        </InputLabel>
                                    </>
                                    :
                                    <>
                                        <Box sx={{
                                            width: '100%',
                                            my: '24px',
                                            p: '16px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            backgroundColor: '#F3EDF7',
                                            color: (!isErrorFileList ? '#615F63' : '#D32F2F')
                                        }}>
                                            {!isErrorFileList ?
                                                <>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <UploadFileIcon sx={{ color: '#2196F3', mr: '16px' }}></UploadFileIcon>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '16px', color: '#000000' }}>{filesList[0].name}</Typography>
                                                            <Typography sx={{ fontSize: '14px' }}>{Math.ceil(Number(filesList[0].size) / 1024 / 8)}Kb • Готов к отправке</Typography>

                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <IconButton onClick={() => { setFilesList([]); }} sx={{ mr: '16px' }}>
                                                            <DeleteIcon></DeleteIcon>

                                                        </IconButton>
                                                        <CheckCircleIcon color='success'></CheckCircleIcon>
                                                    </Box>
                                                </>
                                                :
                                                <>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <UploadFileIcon sx={{ mr: '16px', color: '#D32F2F' }}></UploadFileIcon>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '16px' }}>{filesList[0].name}</Typography>
                                                            <Typography sx={{ fontSize: '14px' }}>{Math.ceil(Number(filesList[0].size) / 1024 / 8)}Kb • Ошибка размера файла</Typography>

                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <IconButton onClick={() => { setFilesList([]); }} sx={{ mr: '16px' }}>
                                                            <DeleteIcon></DeleteIcon>
                                                        </IconButton>
                                                        <ErrorIcon></ErrorIcon>
                                                    </Box>
                                                </>
                                            }

                                        </Box>
                                    </>
                                }

                                {(isHideAnswer) ?
                                    <ButtonOutlined onClick={showAnswer}>Показать решение</ButtonOutlined>
                                    :
                                    <ButtonOutlined onClick={resetSolve}>Скрыть</ButtonOutlined>
                                }

                                <ButtonContained onClick={requestToChatGPT}>Проверить</ButtonContained>

                            </Box>

                            {answerFromGPT ?
                                <Box sx={{ mt: '48px' }}>
                                    <Typography sx={titleMediumStyle}>Проверка решения</Typography>
                                    <Typography sx={bodyLargeStyle}>
                                        <Box sx={{ width: '80%', whiteSpace: 'preserve', mt: '16px' }}>
                                            <Markdown>{answerFromGPT}</Markdown>
                                        </Box>
                                    </Typography>
                                </Box>
                                :
                                <>
                                    {IsLoading
                                        ?
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', py: '48px' }}>
                                            <img src={Loading}
                                                alt="Loading..."
                                                style={{ mixBlendMode: 'multiply', width: '60px', height: '60px' }} />
                                            <Typography sx={{ color: '#49454F', ...theme.typography.body.main }}>Проверяем решение</Typography>
                                        </Box>
                                        : null}
                                </>
                            }
                        </> : ''
                    }

                </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    {index === 1 ? '' :
                        (<Box sx={linkToTask} onClick={() => {
                            setIndexSolution(index - 2);
                            setAnswerValue('');
                            setIsHideAnswer(true);
                        }}>
                            <Box sx={cardLinkToNextTaskStyle}>
                                <SkipPreviousOutlinedIcon sx={{ fontSize: '24px', }}></SkipPreviousOutlinedIcon>
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
                                <SkipNextOutlinedIcon sx={{ fontSize: '24px' }}></SkipNextOutlinedIcon>
                            </Box>
                            <Typography sx={subtitle1Style}>Задача {index + 1}</Typography>
                        </Box>)
                    }

                </Box>
            </Box>

            {mediaDialog ?

                <Dialog
                    fullScreen
                    open={isOpenDialog}
                    onClose={closeDialog}

                    sx={{ display: { xs: 'block', md: 'none' } }}
                >


                    <Box sx={dialogStyle}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography sx={titleLargeStyle}>Задача {task._id.slice(0, 4) + task._id.slice((task._id.length) - 5, (task._id.length))}</Typography>
                                <Typography sx={bodyMainStyle}>{task.difficult} • {task.year} • {task.points} баллов</Typography>
                            </Box>
                            <IconButton onClick={closeDialog}>
                                <CloseIcon fontSize="large"></CloseIcon>
                            </IconButton>
                        </Box>

                        <Box variant='span' sx={{ display: (isOpenWindowSolution ? 'block' : 'none') }}>

                            {task.imageTasks.length !== 0 ?
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                                    {task.imageTasks.map((src, index) => {
                                        return (
                                            <img src={src} alt={`Изображение ${index + 1}`} style={{ width: '100%', marginBottom: '16px', mixBlendMode: 'multiply' }} key={`image ${task._id}${index}`} />
                                        );
                                    })}
                                </Box>
                                : ''}

                            <Typography sx={descriptionStyle}>{task.description}</Typography>

                            {task.subject !== 'programming' ?
                                <Box sx={groupTextFieldStyle}>
                                    <TextField id="answerInput" label="Ответ" variant="outlined" sx={{ width: '100%' }} disabled={!buttonHideSolution}
                                        value={answerValue}
                                        onChange={(e) => {
                                            setAnswerValue(e.target.value);
                                            localStorage.setItem(`${task._id}`, `${e.target.value}`);
                                        }}
                                        type="number"
                                    />
                                    <Typography fontSize='small' sx={{ color: '#B3261E', display: (isShowNotSuccessAlert ? 'block' : 'none') }}>{textNotSuccessAnswer}</Typography>
                                </Box>
                                : ''}

                            <Box sx={solutionStyle}>
                                {task.subject !== 'programming' ?
                                    <>
                                        <Box variant='span' sx={{ display: (isShowSuccessAlert ? 'block' : 'none') }}>
                                            <Alert icon={false} sx={{ borderRadius: '12px', bgcolor: theme.palette.grey.light }}
                                                onClose={() => { setIsShowSuccessAlert(false) }}>🥳  Правильный ответ</Alert>
                                        </Box>
                                        <Box sx={{ my: '16px' }}>
                                            <Typography sx={titleMediumStyle}>Решение</Typography>
                                            <Typography sx={bodyMainStyle}>Ответ: {task.answer}</Typography>
                                        </Box>
                                    </>
                                    :
                                    <>
                                        <Box sx={{ mb: '16px' }}>
                                            <Typography sx={titleMediumStyle}>Решение</Typography>
                                            <Typography sx={bodyMainStyle}>Авторский код:</Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'preserve' }}>
                                            <Typography component={'pre'} style={{ margin: '0px' }}>
                                                <Typography component={'code'}>
                                                    {task.answerCode}
                                                </Typography>
                                            </Typography>
                                        </Typography>
                                    </>
                                }

                                <Box sx={answerStyle}>
                                    {task.solution.map((array, index) => {
                                        return (
                                            <Box key={`div ${task._id}${index}`}>
                                                {
                                                    array.map((text, index2) => {
                                                        if (!(text.includes('https://'))) return <Typography sx={bodyLargeStyle} key={`solutionText ${index}.${index2}`}><Box sx={{ whiteSpace: 'pre-wrap' }}>{text}</Box></Typography>
                                                        else {
                                                            return <Box sx={{ width: '100%' }}>
                                                                <img src={`${text}`} alt={`Изображение решения ${index}.${index2}`} loading="lazy"
                                                                    key={`solutionText ${task._id}${index}.${index2}`} style={{ width: '100%', mixBlendMode: 'multiply' }} />
                                                            </Box>
                                                        }
                                                    })
                                                }
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>

                            {task.subject !== 'programming' ?
                                <Box sx={buttonGroupStyle}>
                                    {(isHideAnswer) ?
                                        <>
                                            <ButtonOutlined onClick={showAnswer}>Показать решение</ButtonOutlined>
                                            <ButtonContained onClick={checkAnswer}>Проверить ответ</ButtonContained>
                                        </>
                                        :
                                        <ButtonOutlined onClick={resetSolve}>Сбросить</ButtonOutlined>
                                    }
                                </Box>
                                : ''}


                            {(task.subject === 'programming') ?
                                <>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {filesList.length === 0 ?
                                            <>
                                                <TextField
                                                    accept="text/*"
                                                    style={{ display: 'none' }}
                                                    id="fileInput"
                                                    type="file"
                                                    inputProps={{
                                                        accept: '.txt,.py,.js,.html,.css,.java,.cpp',
                                                    }}
                                                    onChange={changeInputFile}
                                                />
                                                <InputLabel htmlFor="fileInput" sx={inputFilesStyle}>
                                                    <UploadFileIcon sx={{ color: '#2196F3', mb: '8px' }}></UploadFileIcon>
                                                    <Typography sx={{ color: '#000000', fontSize: '16px' }}><Typography component="span" style={{ color: '#2196F3', textDecoration: 'underline #2196F3' }}>Выберите файл</Typography> или перетащите его сюда</Typography>
                                                    <Typography sx={{ fontSize: '14px' }}>TXT, PY, JS, JAVA (макс. 1MB)</Typography>
                                                </InputLabel>
                                            </>
                                            :
                                            <>
                                                <Box sx={{
                                                    width: '100%',
                                                    my: '24px',
                                                    p: '16px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    backgroundColor: '#F3EDF7',
                                                    color: (!isErrorFileList ? '#615F63' : '#D32F2F')
                                                }}>
                                                    {!isErrorFileList ?
                                                        <>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <UploadFileIcon sx={{ color: '#2196F3', mr: '16px' }}></UploadFileIcon>
                                                                <Box>
                                                                    <Typography sx={{ fontSize: '16px', color: '#000000' }}>{filesList[0].name}</Typography>
                                                                    <Typography sx={{ fontSize: '14px' }}>{Math.ceil(Number(filesList[0].size) / 1024 / 8)}Kb • Готов к отправке</Typography>

                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <IconButton onClick={() => { setFilesList([]); }} sx={{ mr: '16px' }}>
                                                                    <DeleteIcon></DeleteIcon>

                                                                </IconButton>
                                                                <CheckCircleIcon color='success'></CheckCircleIcon>
                                                            </Box>
                                                        </>
                                                        :
                                                        <>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <UploadFileIcon sx={{ mr: '16px', color: '#D32F2F' }}></UploadFileIcon>
                                                                <Box>
                                                                    <Typography sx={{ fontSize: '16px' }}>{filesList[0].name}</Typography>
                                                                    <Typography sx={{ fontSize: '14px' }}>{Math.ceil(Number(filesList[0].size) / 1024 / 8)}Kb • Ошибка размера файла</Typography>

                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <IconButton onClick={() => { setFilesList([]); }} sx={{ mr: '16px' }}>
                                                                    <DeleteIcon></DeleteIcon>
                                                                </IconButton>
                                                                <ErrorIcon></ErrorIcon>
                                                            </Box>
                                                        </>
                                                    }

                                                </Box>
                                            </>
                                        }

                                        {(isHideAnswer) ?
                                            <ButtonOutlined onClick={showAnswer}>Показать решение</ButtonOutlined>
                                            :
                                            <ButtonOutlined onClick={resetSolve}>Скрыть</ButtonOutlined>
                                        }

                                        <ButtonContained onClick={requestToChatGPT}>Проверить</ButtonContained>

                                    </Box>

                                    {answerFromGPT ?
                                        <Box sx={{ mt: '48px' }}>
                                            <Typography sx={titleMediumStyle}>Проверка решения</Typography>
                                            <Typography sx={bodyLargeStyle}>
                                                <Box sx={{ width: '80%', whiteSpace: 'preserve', mt: '16px' }}>
                                                    <Markdown>{answerFromGPT}</Markdown>
                                                </Box>
                                            </Typography>
                                        </Box>
                                        :
                                        <>
                                            {IsLoading
                                                ?
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', py: '48px' }}>
                                                    <img src={Loading}
                                                        alt="Loading..."
                                                        style={{ mixBlendMode: 'multiply', width: '60px', height: '60px' }} />
                                                    <Typography sx={{ color: '#49454F', ...theme.typography.body.main }}>Проверяем решение</Typography>
                                                </Box>
                                                : null}
                                        </>
                                    }
                                </> : ''
                            }

                        </Box>
                    </Box>
                </Dialog>
                : null}
        </>
    )
}

export default Solution;